import React from "react";
import Gallery from "./Gallery"
import firebase from "./firebase/firebase.js"
import { CommunicationPresentToAll } from "material-ui/svg-icons";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import plant from "./utils/plantwallpaper5.jpeg"
import MUIButton from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const FullWidthTabs = (diffprops) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          //aria-label="full width tabs example"
          centered
        >
          <Tab label="Set-Up Details" {...a11yProps(0)} />
          <Tab label="Gallery" {...a11yProps(1)} />
          <Tab label="Livefeed" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>

          <div class="container">
            <img src={plant} alt="plant" />
            <div class="top-left">
              <h2 class="text-title2">
                {diffprops.deets.name}
              </h2>
              <h7 class="text-title2">
                The set-up exist at: {diffprops.deets.postalcode}
              </h7>


              <h5 class="text-title2">
                Current Water level: {diffprops.deets.waterlevel} %
              </h5>
              <h5 class="text-title2">
                Current Power level: {diffprops.deets.powerlevel} %
              </h5>

            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Gallery photos={diffprops.deets.photosobject} />
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div style = {{flexDirection :"row"}}>

            <div style={{ flexDirection: "column" }}>
              <h6 className = "text-title2" style = {{textAlign:"Left"}}>
                Current Position of Robot
              </h6>

              <div style={{ flexDirection: "row" }}>
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
              </div>
              <div style={{ flexDirection: "row" }}>
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
              </div>
              <div style={{ flexDirection: "row" }}>
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
                <MUIButton variant="outlined" style={{ padding: "50px", margin: "5px" }} />
              </div>
            </div>

            <Divider orientation="vertical" flexItem />

            <div style={{ flexDirection: "column" }}>
              <h2 className = "text-title2">
                Livefeed
              </h2>
            </div>

          </div>
        </TabPanel>
      </SwipeableViews>
    </div >
  );
}



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photosurl: [],
      pathurllength: null,
      photosobject: {}
    }
    this.getPics = this.getPics.bind(this);
    this.randint = this.randint.bind(this);
  }

  async componentDidMount() {
    console.log("componentdidmount", this.state)
    this.setState({
      lat: this.props.location.state.lat,
      long: this.props.location.state.long,
      name: this.props.location.state.name,
      postalcode: this.props.location.state.postalcode,
      powerlevel: this.props.location.state.powerlevel,
      waterlevel: this.props.location.state.waterlevel,
      hasstart: this.props.location.state.hasstart
    })
    await this.getPics(this.props.location.state.id)

  }

  async getPics(deets) {
    const storage = firebase.storage();
    var storageRef = storage.ref(deets)
    var listRef = storageRef.child('images');

    var imageref = []
    await listRef.listAll().then(function (res) {
      res.items.forEach(function (itemRef) {
        imageref.push(itemRef.name)
      });
    }).catch(function (error) {
      console.log("error")
    });

    var pathurl = []
    for (let i = 0; i < imageref.length; i++) {
      let path = "/images/" + imageref[i]
      pathurl.push(path)
    }

    this.setState({
      pathurllength: pathurl.length
    })

    var downloadurl = []
    let obj = []
    for (var i = 0; i < pathurl.length; i++) {
      var starsRef = storageRef.child(pathurl[i]);
      downloadurl.push(starsRef.getDownloadURL().then((url) => {
        // downloadurl.add(url)
        this.state.photosurl.push(url)
        this.setState(this.state)

        let emptyobj = {}
        emptyobj.src = url
        emptyobj.width = 3
        emptyobj.height = 2
        obj.push(emptyobj)

        this.setState({
          photosobject: obj
        })
      }
      ))
    }

  }

  randint(int) {
    return Math.floor(Math.random() * int) + 1; //returns rand int between 1 to (int + 1)
  }

  render() {
    if (this.state.photosobject.length == this.state.pathurllength && this.state.photosobject.length > 0) {
      var exist = true
    }
    console.log(exist, this.state)
    return (
      <div>
        <div>
          {exist ? (
            <FullWidthTabs fluid className="muitab" deets={this.state} />
          ) : (
              <div />
            )}
        </div>

      </div>

    );
  }
}

export default App
