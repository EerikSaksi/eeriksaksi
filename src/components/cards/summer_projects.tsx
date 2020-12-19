import React, { useState } from "react";
import { Grid, Tabs, Tab, Hidden, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ProgressiveImageProps } from "react-progressive-image-loading";
import QAndAAccordion from "components/q_and_a_accordion";
import CustomCardWithBackground from "./custom_card_with_background";
import CourseTable from "components/course_table";

const technologyRows = [
  [
    ["React", "Creating a responsive and reactive client experience"],
    ["Bootstrap", "Saving time and effort by using prebuilt stylistic components"],
    ["Apollo Client", "Fetching and sending data to the backend"],
    ["React Google Login", "Authenticating the user with the backend"],
    ["React Hook Inview/React Observer Polyfill", "Used to help create responsive designs (whether elements were in view and when user resized browser)"],
  ],
  [
    ["node.js", "Javascript runtime and package/settings/script management"],
    ["Express", "Routing to https, sending React client and handling /graphql requests"],
    ["Apollo Server", "Handling API requests, schema type enforcement, resolver and type hierarchy definitions"],
    ["Jest", "Testing resolvers"],
  ],
  [
    ["Sequelize", "ORM to simplify data fetching, (most if not all my operations were CRUD so I didn't need much control)"],
    ["SQLite 3", "This was the underlying database that Sequelize used. I would often use my CLI to inspect the state of it."],
    ["Caching", "I cached some queries with Apollo's @cacheControl, and some data that was required in other queries in my database."],
  ],
  [
    [
      "Genius API",
      "Song metadata and song search (also you'd think that Genius, who are known for lyrics would include lyrics in their API, but instead I had to fetch the page and parse the HTML DOM to get them.)",
    ],
    [
      "Youtube API",
      "Much like Genius, YouTube video search and and video metadata. I found that the default YouTube API quota is very low, but I managed to solve this by prefilling the Youtube search with the genius song name (one Youtube Search query as opposed to one whenever the user changes the search input)",
    ],
    [
      "Google OAuth 2.0",
      "When the user logged in on the React client, I sent the token to my server, which converted it to a GoogleID, and then sent back user data (or alerted that the user didn't exist.)",
    ],
  ],
  [
    [
      "Heroku",
      "Hosting is done on a Heroku hobby dyno (this provides free SSL and ensures the server doesn't sleep). Prior to pushing, I run my react App build script, and the tests are run on the Heroku server. I have two custom domains (www.tunety.pe and tunety.pe).",
    ],
    ["Namecheap", "I bought the domain off Namecheap, and I am hosting the www... domain on CNAME record, and the root domain on an ALIAS record."],
    ["Other hosting considerations", "I forward the user to https through express, use process.env to hide secrets, and use process.env.JEST_WORKER_ID to change behaviour when testing."],
  ],
];

const useStyles = makeStyles((theme) => ({
  tab: {
    [theme.breakpoints.up("sm")]: {
      fontSize: "2em",
    },
  },
  grid: {
    maxWidth: "100%",
  },
  typography: {
    textAlign: "center",
  },
}));

const SummerProjects: React.FC<{ alertCurrentlyVisible: () => void }> = ({ alertCurrentlyVisible }) => {
  const [activeValue, setActiveValue] = useState(0);
  const classes = useStyles();
  const technologies = (
    <Grid className={classes.grid}>
      <Tabs variant="fullWidth" centered value={activeValue} onChange={(_event, value) => setActiveValue(value)}>
        <Tab className={classes.tab} label="Frontend" />
        <Tab className={classes.tab} label="Backend" />
        <Tab className={classes.tab} label="Data storage" />
        <Tab className={classes.tab} label="APIs" />
        <Tab className={classes.tab} label="Hosting" />
      </Tabs>
      <CourseTable headers={["Technology", "Purpose"]} rowCols={technologyRows[activeValue]} />
    </Grid>
  );

  const questionAnswers = [
    {
      question: "What is this site?",
      answer: (
        <Typography variant="h4">
          I made this over the summer to get more experience in full stack development during the COVID epidemic when working was unfeasible. The site allows you to practice your typing to the lyrics
          of a song as it plays, and to create synchronizations for songs that don't have them. If you scroll down on the home page, you should see demonstrations of different features.
        </Typography>
      ),
    },
    { question: "What technologies did I use?", answer: technologies },
    {
      question: "What do I still want to improve?",
      answer: (
        <Typography variant="h4">
          I couldn't get in contact with the person who owns{" "}
          <a href="https://github.com/gabolsgabs/DALI" target="_blank" rel="noopener noreferrer">
            this dataset
          </a>
          , and only managed to get in contact with a fellow student of theirs who told me they'd try to get in touch with the owner, who then didn't respond to any further messages. This would be
          great as it would remove the need to manually synchronize the song, and the user could skip straight to preview. Other things include better data browsing, such as a global leaderboards for
          users and most popular songs, and better mobile optimization (although I don't know if people want to practice their texting speed.){" "}
        </Typography>
      ),
    },
  ];
  return (
    <CustomCardWithBackground
      progressiveImageProps={{ src: require("media/rick.gif"), preview: require("media/rick-tiny.jpg") } as ProgressiveImageProps}
      backgroundImageStyle={{ backgroundPosition: "20% 0%" }}
      alertCurrentlyVisible={alertCurrentlyVisible}
      cardStyle={{ maxWidth: "100%" }}
    >
      <React.Fragment>
        <Hidden xsDown>
          <Grid container justify="center">
            <Grid item xs={12}>
              <a href="https://tunety.pe" target="_blank" rel="noopener noreferrer">
                <Typography className = {classes.typography} variant="h2">
                  tunety.pe
                </Typography>
              </a>
            </Grid>
          </Grid>
        </Hidden>
        <QAndAAccordion questionAnswers={questionAnswers} />
      </React.Fragment>
    </CustomCardWithBackground>
  );
};

export default SummerProjects;
