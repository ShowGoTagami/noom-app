import React, { Fragment, useState } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { matchPath } from 'react-router';
import { db } from './Firebase';
import { v4 as uuidv4 } from 'uuid';

// containers
import { Top } from './containers/Top';
import { AddMember } from './containers/AddMember';
import { Owner } from './containers/Owner';
import { Member } from './containers/Member';
import { NotFound } from './containers/NotFound';

// components
import { Header } from './components/shared';
import { BaseContainer, Box } from './components/Layouts';
import { Button, IconButton } from './components/Buttons';
import { GlobalCircleLoader } from './components/Loader';
import { CloseIcon, PersonAddIcon } from './components/Icons';
import { Typography } from './components/Typography';

// images
import { NoomLogo, ThrowAway } from './images';

// style
import { useStyles } from './styles';

// constants
import { RANDOM_FIRST_MESSAGE } from './constants';
import { Dialog, DialogTitle, DialogContent, DialogActions } from './components/Dialog';

export const App = () => {
  console.log('レンダリング！')
  const initialState = {
    isOpenGlobalLoader: false,
    isOpenDeleteRoomDialog: false,
    members: [],
  }
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState(initialState);
  const isOwnerPage = useRouteMatch({
    path: "/rooms/:uuidHash/owner/:ownerId",
    exact: true,
  });
  const currentPathObj = matchPath(useLocation().pathname, {
    path: '/rooms/:uuidHash/owner/:ownerId',
  })

  const initializeRomm = async () => {
    const roomUuid = uuidv4();
    const ownerId = uuidv4();
    const batch = db.batch();
    batch.set(db.collection("rooms").doc(roomUuid), {
      ownerId: ownerId,
    })

    const messageDocRef = db.collection("rooms").doc(roomUuid).collection("messages")

    RANDOM_FIRST_MESSAGE.map((message) => {
      return batch.set(messageDocRef.doc(), {
        messageType: message.messageType,
        body: message.body
      })
    })

    await batch.commit();

    return { roomUuid, ownerId };
  }
  const clickTopConversionButton = () => {
    updateGlobalLoaderModalState(true)
    initializeRomm()
      .then((res) => {
        history.push(`/rooms/${res.roomUuid}/owner/${res.ownerId}/members`)
        updateGlobalLoaderModalState(false)
      }).catch(() => {
        updateGlobalLoaderModalState(false)
      })
  };

  const moveToOwnerPage = (roomUuid, ownerId) => {
    history.push(`/rooms/${roomUuid}/owner/${ownerId}`)
  }

  const ShowRoomId = ({ originalProp }) => {
    const { uuidHash } = useParams();
    return (
      <div>
        <p>{originalProp} {uuidHash}だよ</p>
      </div>
    );
  };

  const updateGlobalLoaderModalState = (isOpen) => {
    setState({ ...state, isOpenGlobalLoader: isOpen })
  };

  const deleteRoom = () => {
    if (!currentPathObj || !currentPathObj?.params.uuidHash) { return; }
    setState({ ...state, isOpenGlobalLoader: true })
    db.collection("rooms").doc(currentPathObj.params.uuidHash).delete()
      .then(() => {
        history.push('/')
        setState({
          ...state,
          isOpenGlobalLoader: false,
          isOpenDeleteRoomDialog: false
        })
      })
  }

  return (
    <div className="App">
      <Dialog open={state.isOpenDeleteRoomDialog} onClose={() => setState({ ...state, isOpenDeleteRoomDialog: false })}>
        <DialogTitle>
          <Typography variant="h6" component="h2">
            この部屋を削除しますか？
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box p={2}>
            <img src={ThrowAway} alt="throw-away" className={classes.fitWidth} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState({ ...state, isOpenDeleteRoomDialog: false })}>
            <Typography className={classes.fontWeightBold}>
              いいえ
            </Typography>
          </Button>
          <Button color="secondary" onClick={() => deleteRoom()}>
            <Typography className={classes.fontWeightBold}>
              削除します
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      <Header
        children={
          isOwnerPage ?
            <Box display="flex" justifyContent="space-between" width="100%">
              <IconButton edge="start" component={Link} to={location => `${location.pathname}/members`}>
                <PersonAddIcon />
              </IconButton>
              <Button component={Link} to="/">
                <img src={NoomLogo} alt="logo" />
              </Button>
              <IconButton edge="end" onClick={() => setState({ ...state, isOpenDeleteRoomDialog: true })}>
                <CloseIcon />
              </IconButton>
            </Box>
            :
            <Button component={Link} to="/">
              <img src={NoomLogo} alt="logo" />
            </Button>
        }
      />
      <GlobalCircleLoader isOpen={state.isOpenGlobalLoader} />
      <Fragment>
        <BaseContainer contents={
          <Switch>
            <Route
              exact
              path="/rooms/:uuidHash"
              render={
                ({ match }) =>
                  <Member
                    match={match}
                    classes={classes}
                    updateGlobalLoaderModalState={(isOpen) => updateGlobalLoaderModalState(isOpen)}
                  />
              }
            />
            <Route
              exact
              path="/rooms/:uuidHash/owner/:ownerId/members"
              render={
                ({ match }) =>
                  <AddMember
                    match={match}
                    onClickConversionButton={moveToOwnerPage}
                    members={state.members}
                    setMember={(members) => setState({ ...state, members: members, isOpenGlobalLoader: false })}
                  />
              }
            />
            <Route
              exact
              path="/rooms/:uuidHash/owner/:ownerId"
              render={({ match }) =>
                <Owner
                  match={match}
                  classes={classes}
                  members={state.members}
                  setMember={(members) => setState({ ...state, members: members })}
                  updateGlobalLoaderModalState={(isOpen) => updateGlobalLoaderModalState(isOpen)}
                />
              }
            />
            <Route exact path="/">
              <Top
                classes={classes}
                onClickConversionButto={clickTopConversionButton}
              />
            </Route>
            <Route>
              <NotFound classes={classes} />
            </Route>
          </Switch>
        } />
      </Fragment>
    </div>
  );
};
