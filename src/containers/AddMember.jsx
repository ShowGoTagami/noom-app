import React, { Fragment, useState, useEffect } from 'react';
import { db } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';

// components
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '../components/Dialog';
import { Typography } from '../components/Typography';
import { CopiableTextArea } from '../components/Input';
import { TextField, InputAdornment } from '../components/Input';
import { IconButton, ConversionButton } from '../components/Buttons';
import { CheckCircleOutlineIcon, DeleteIcon } from '../components/Icons';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '../components/List';
import { Snackbar, MuiAlert } from '../components/Snackbar';
import { ConversionWrapper } from '../components/shared';

// style
import { useStyles } from '../styles';
import { Box } from '../components/Layouts';

// utils
import { Validation } from '../utils/Validation';

// constants
import { COLORS } from '../styles/constants';

export const AddMember = ({
  match,
  onClickConversionButton,
  members,
  setMember,
}) => {
  const MAX_MEMBER_COUNT = 10;
  const roomUrl = `https://noom-app.org/rooms/${match.params.uuidHash}`;
  const initialState = {
    isOpenTutorialDialog: true,
    isOpenAddMemberForm: false,
  }
  const newMemberInitialState = {
    memberName: '',
    memberFormError: '',
  }
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const [newMemberState, setNewMemberState] = useState(newMemberInitialState);
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  useEffect(() => {
    if (members.length > 0) { return; }
    const setExistingMembers = async () => {
      let existingMembers = [];
      await db.collection("rooms").doc(match.params.uuidHash).collection('members').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            existingMembers.push({
              uuidHash: doc.id,
              name: doc.data().name,
            })
          })
        })
      await setMember(existingMembers)
    }
    setExistingMembers();
  }, []);

  const onChangeMemberInput = (event) => {
    const value = event.target.value;
    setNewMemberState({
      ...newMemberState,
      memberName: value,
      memberFormError: Validation.formValidate('member', value)
    })
  };

  const submitNewMember = () => {
    if (isNewMemberFormAnyError() || !newMemberState.memberName) { return; }
    const memberUuid = uuidv4();
    createNewMember(memberUuid, newMemberState.memberName)
    setMember([...members, { uuidHash: memberUuid, name: newMemberState.memberName }])
    setNewMemberState(newMemberInitialState)
    var wrapper = document.getElementById('scrollable-wrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
  };

  const isNewMemberFormAnyError = () => (
    Boolean(newMemberState.memberFormError.length)
  );

  const deleteAddedMember = (index, uuidHash) => {
    const newMemberArray = members.splice(index, 1)
    setState(newMemberArray)
    db.collection("rooms").doc(match.params.uuidHash).collection('members').doc(uuidHash).delete()
  };

  const openSnackBar = () => {
    setIsOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setIsOpenSnackbar(false);
  };

  const onKeyPressOnInput = (e) => {
    if (e.key === 'Enter') {
      submitNewMember()
      e.preventDefault();
    }
  };

  const conversionButtonText = () => {
    if (members.length === 0) { return '参加者なしではじめる' }
    return `${members.length}人ではじめる`
  };

  const conversionButtonColor = () => {
    if (members.length === 0) { return 'secondary' }
    return 'primary';
  };

  const createNewMember = (mamberUuid, memberName) => {
    const date = new Date();
    const currentTime = date.getTime();
    db.collection("rooms").doc(match.params.uuidHash).collection('members').doc(mamberUuid)
      .set({
        name: memberName,
        createdAt: currentTime,
      })
  };

  const isAcceptableMember = () => (
    members.length < MAX_MEMBER_COUNT
  );

  return (
    <Fragment>
      <Dialog open={state.isOpenTutorialDialog}>
        <DialogTitle
          className={classes.fontWeightBold}
          onClose={() => setState({ ...state, isOpenTutorialDialog: false })}
        >
          つかいかた
        </DialogTitle>
        <DialogContent>
          <Box pb={2}>
            <Typography color="secondary" className={classes.fontWeightBold}>1. 参加する方にこのURLを共有</Typography>
            <Box pt={2} pb={1}>
              <CopiableTextArea
                labelText="メンバー用のURL"
                displayText={roomUrl}
                onClickCopyButton={openSnackBar}
              />
            </Box>
          </Box>
          <Box pt={2} pb={2}>
            <Typography>2. みんなで話題や質問を投稿！</Typography>
          </Box>
          <Box pt={2} pb={2}>
            <Typography>3. あなた(オーナー)が１つ選ぶ</Typography>
          </Box>
          <Box pt={2} pb={2}>
            <Typography>4. みんなに話す！</Typography>
          </Box>
          <Box pt={2} pb={2} textAlign="center">
            <Typography
              variant="body2"
              color="secondary"
              className={classes.textUnderline}
              onClick={() => setState({ ...state, isOpenTutorialDialog: false })}
            >
              完全に理解した！
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key="top, center"
        open={isOpenSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={1000}
      >
        <MuiAlert onClose={handleCloseSnackbar} elevation={6} variant="filled" severity="success">
          コピーしました！
        </MuiAlert>
      </Snackbar>
      <Box pb={2}>
        <Typography className={classes.fontWeightBold}>メンバー  {`${members.length}/${MAX_MEMBER_COUNT}人`}</Typography>
        <Box className={classes.scrollableWrapper} id="scrollable-wrapper">
          {
            members.length > 0 &&
            <Box mt={2}>
              <List className={classes.whiteBackground}>
                {
                  members.map(({ name, uuidHash }, index) => (
                    <ListItem key={uuidHash}>
                      <ListItemText primary={name} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => deleteAddedMember(index, uuidHash)} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          }
          {
            isAcceptableMember() &&
            <Box mt={2} mb={2}>
              {
                state.isOpenAddMemberForm ?
                  <Box pr={1} pl={1}>
                    <TextField
                      label="参加するひと"
                      variant="outlined"
                      value={newMemberState.memberName}
                      color={
                        isNewMemberFormAnyError() ?
                          'primary'
                          :
                          'secondary'
                      }
                      InputProps={{
                        endAdornment: <InputAdornment>
                          <IconButton
                            disabled={isNewMemberFormAnyError() || !newMemberState.memberName}
                            onClick={() => submitNewMember()}
                          >
                            <CheckCircleOutlineIcon style={{ fill: (!isNewMemberFormAnyError() && newMemberState.memberName) && COLORS.secondary }} />
                          </IconButton>
                        </InputAdornment>
                      }}
                      name="memberName"
                      autoFocus
                      fullWidth
                      onChange={e => onChangeMemberInput(e)}
                      error={isNewMemberFormAnyError()}
                      helperText={isNewMemberFormAnyError() && newMemberState.memberFormError}
                      onKeyPress={(e) => onKeyPressOnInput(e)}
                    />
                  </Box>
                  :
                  <Typography
                    color="secondary"
                    className={classes.textUnderline}
                    onClick={() => setState({ ...state, isOpenAddMemberForm: true })}
                  >
                    + 追加する
                  </Typography>
              }
            </Box>
          }
        </Box>
      </Box>
      <ConversionWrapper
        contents={
          <Fragment>
            <ConversionButton
              buttonColor={conversionButtonColor()}
              buttonText={conversionButtonText()}
              onClickButtonHandler={() => onClickConversionButton(match.params.uuidHash, match.params.ownerId)}
            />
          </Fragment>
        }
      />
    </Fragment>
  )
}
