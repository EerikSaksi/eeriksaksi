import React, { useState } from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { ProgressiveImageProps } from 'react-progressive-image-loading';
import QAndAAccordion from 'components/q_and_a_accordion';
import CustomCardWithBackground from './custom_card_with_background';
import CourseTable from 'components/course_table';

const technologyRows = [
  [
    ['React', 'Creating a responsive and reactive client experience'],
    ['Bootstrap', 'Saving time and effort by using prebuilt stylistic components'],
    ['Apollo Client', 'Fetching and sending data to the backend'],
    ['React Google Login', 'Authenticating the user with the backend'],
    ['React Hook Inview/React Observer Polyfill', 'Used to help create responsive designs (whether elements were in view and when user resized browser)'],
  ],
  [
    ['node.js', 'Javascript runtime and package/settings/script management'],
    ['Express', 'Routing to https, sending React client and handling /graphql requests'],
    ['Apollo Server', 'Handling API requests, schema type enforcement, resolver and type hierarchy definitions'],
    ['Jest', 'Testing resolvers'],
  ],
  [
    ['Sequelize', "ORM to simplify data fetching, (most if not all my operations were CRUD so I didn't need much control)"],
    ['SQLite 3', 'This was the underlying database that Sequelize used. I would often use my CLI to inspect the state of it.'],
    ['Caching', "I cached some queries with Apollo's @cacheControl, and some data that was required in other queries in my database."],
  ],
  [
    ['Genius API', "Song metadata and song search (also you'd think that Genius, who are known for lyrics would include lyrics in their API, but instead I had to fetch the page and parse the HTML DOM to get them.)"],
    ['Youtube API', 'Much like Genius, YouTube video search and and video metadata. I found that the default YouTube API quota is very low, but I managed to solve this by prefilling the Youtube search with the genius song name (one Youtube Search query as opposed to one whenever the user changes the search input)'],
    ['Google OAuth 2.0', "When the user logged in on the react client, I sent the token to my server, which converted it to a GoogleID, and then sent back user data (or alerted that the user didn't exist.)"],
  ],
  [
    ['Heroku', "Hosting is done on a Heroku hobby dyno (this provides free SSL and ensures the server doesn't sleep). Prior to pushing, I run my react App build script, and the tests are run on the Heroku server. I have two custom domains (www.tunety.pe and tunety.pe)."],
    ['Namecheap', 'I bought the domain off Namecheap, and I am hosting the www... domain on CNAME record, and the root domain on an ALIAS record.'],
    ['Other hosting considerations', "I forward the user to https through express, use process.env to hide secrets, and use process.env.JEST_WORKER_ID to change behaviour when testing."],
  ],
];

const SummerProjects: React.FC = () => {
  const [activeValue, setActiveValue] = useState(0);

  const technologies = (
    <Grid>
      <Tabs value={activeValue} onChange={(_event, value) => setActiveValue(value)}>
        <Tab label='Frontend' />
        <Tab label='Backend' />
        <Tab label='Data storage' />
        <Tab label='APIs' />
        <Tab label='Hosting' />
      </Tabs>
      <CourseTable headers={['Technology', 'Purpose']} rowCols={technologyRows[activeValue]} />
    </Grid>
  );
  console.log(technologyRows[0]);

  const questionAnswers = [
    { question: 'What is this site?', answer: <Typography variant='body1'>I made this over the summer to get more experience in full stack development during the COVID epidemic when working was unfeasible. The site allows you to practice your typing to the lyrics of a song as it plays, and to create synchronizations for songs that don't have them. If you scroll down on the home page, you should see demonstrations of different features.</Typography> },
    { question: 'What technologies did I use?', answer: technologies },
  ];
  return (
    <CustomCardWithBackground progressiveImageProps={{ src: require('media/leidos.jpeg'), preview: require('media/leidos-tiny.jpeg') } as ProgressiveImageProps} backgroundImageStyle={{ backgroundPosition: '100% 0%' }}>
      >
      <React.Fragment>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <a href='https://tunety.pe' target='_blank'>
              <Typography style={{ textAlign: 'center' }} variant='h2'>
                tunety.pe
              </Typography>
            </a>
          </Grid>
        </Grid>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default SummerProjects;
