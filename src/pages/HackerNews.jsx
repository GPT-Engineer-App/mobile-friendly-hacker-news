import React, { useEffect, useState } from 'react';
import { Container, VStack, Heading, Text, Select, Switch, useColorMode } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const HackerNews = () => {
  const [stories, setStories] = useState([]);
  const [filter, setFilter] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(data => {
        const top10Ids = data.slice(0, 10);
        return Promise.all(top10Ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())));
      })
      .then(stories => setStories(stories));
  }, []);

  const filteredStories = stories.filter(story => {
    if (!filter) return true;
    const lowerTitle = story.title.toLowerCase();
    return (
      (filter === 'engineering' && lowerTitle.includes('engineer')) ||
      (filter === 'design' && lowerTitle.includes('design')) ||
      (filter === 'psychology' && lowerTitle.includes('psychology'))
    );
  });

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Heading>Hacker News Top Stories</Heading>
        <Switch
          isChecked={colorMode === 'dark'}
          onChange={toggleColorMode}
          size="lg"
          icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        >
          {colorMode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Switch>
        <Select placeholder="Filter by subject" onChange={(e) => setFilter(e.target.value)}>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="psychology">Psychology</option>
        </Select>
        {filteredStories.map(story => (
          <VStack key={story.id} align="start" p={4} borderWidth={1} borderRadius="md" w="100%">
            <Text fontSize="lg" fontWeight="bold">{story.title}</Text>
            <Text>By: {story.by}</Text>
            <Text>Score: {story.score}</Text>
            <Text as="a" href={story.url} color="teal.500" target="_blank">Read more</Text>
          </VStack>
        ))}
      </VStack>
    </Container>
  );
};

export default HackerNews;