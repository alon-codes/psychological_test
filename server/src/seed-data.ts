import { DeepPartial } from 'typeorm';
import { QuestionEntity } from './quiz/entities/question.entity';

export const seed_data: Array<DeepPartial<QuestionEntity>> = [
  {
    title: 'When you`re at a party, how do you feel?',
    options: [
      { text: 'Energized and excited by the crowd', points: 4 },
      {
        text: 'Slightly energized, but also a bit overwhelmed',
        points: 3,
      },
      { text: 'Neutral', points: 2 },
      {
        text: 'A little drained, but still enjoying yourself',
        points: 1,
      },
      { text: 'Completely drained and exhausted', points: 0 },
    ],
  },
  {
    title:
      'Do you prefer spending time alone, with a few close friends, with a large group of people, or in a public space like a coffee shop?',
    options: [
      { text: 'Alone', points: 3 },
      { text: 'With a few close friends', points: 2 },
      { text: 'In a large group of people', points: 1 },
      { text: 'In a public space like a coffee shop', points: 0 },
    ],
  },
  {
    title: 'When you have a problem, what is your first instinct?',
    options: [
      { text: 'Talk it out with someone else', points: 2 },
      { text: 'Think through it on your own', points: 3 },
      {
        text: 'Seek out information from books or the internet',
        points: 1,
      },
      { text: 'Avoid thinking about it altogether', points: 0 },
    ],
  },
  {
    title: 'When you have a problem, what is your first instinct?',
    options: [
      {
        text: 'Talk it out with someone else',
        points: 2,
      },
      {
        text: 'Think through it on your own',
        points: 3,
      },
      {
        text: 'Seek out information from books or the internet',
        points: 1,
      },
      {
        text: 'Avoid thinking about it altogether',
        points: 0,
      },
    ],
  },
  {
    title: 'How do you feel in a group conversation?',
    options: [
      {
        text: 'Comfortable and engaged',
        points: 3,
      },
      {
        text: 'A little nervous, but still contributing',
        points: 2,
      },
      {
        text: 'Neutral',
        points: 1,
      },
      {
        text: 'Uncomfortable or overwhelmed',
        points: 0,
      },
    ],
  },
  {
    title: 'How often do you initiate social plans?',
    options: [
      {
        text: 'Very often',
        points: 3,
      },
      {
        text: 'Sometimes',
        points: 2,
      },
      {
        text: 'Rarely',
        points: 1,
      },
    ],
  },
  {
    title:
      'Do you prefer to socialize in structured situations or unstructured situations?',
    options: [
      {
        text: 'Structured situations, such as parties or events',
        points: 3,
      },
      {
        text: 'Unstructured situations, such as hanging out with friends or going to a coffee shop',
        points: 2,
      },
    ],
  },
  {
    title: 'How often do you try new things?',
    options: [
      {
        text: 'Very often',
        points: 3,
      },
      {
        text: 'Sometimes',
        points: 2,
      },
      {
        text: 'Rarely',
        points: 1,
      },
    ],
  },
];
