import React, { Fragment, useState } from 'react';

// components
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '../components/Dialog';
import { Box } from '../components/Layouts';
import { ConversionButton } from '../components/Buttons';
import { Typography } from '../components/Typography';
import { CoverImage } from '../components/Images';

// images
import { TopServiceImage } from '../images';

export const Top = ({
  classes,
  onClickConversionButto,
}) => {
  const [isOpenExistingRoom, setIsOpenExistingRoom] = useState(false);

  return (
    <Fragment>
      <Dialog
        open={isOpenExistingRoom}
        onClose={() => setIsOpenExistingRoom(false)}
        fullWidth
      >
        <DialogTitle>
          <Typography
            variant="h6"
          >
            作成済みの部屋に入る方法
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>部屋のURLにアクセスしよう！<span role="img" aria-label="beer">🍺</span></Typography>
          <Typography>まだ部屋を作っていない場合は、「いますぐ部屋をつくる」ボタンから作成することができいます。</Typography>
        </DialogContent>
      </Dialog>
      <Box pr={2} pl={2}>
        <Box pt={2} pb={2}>
          <Typography variant="h4" component="h2" className={classes.fontWeightBold}>
            オンライン飲み会もっとたのしく<span role="img" aria-label="party popper">🎉</span>
          </Typography>
        </Box>
        <Box width="100%">
          <CoverImage imageUrl={TopServiceImage} altText="top-image" />
        </Box>
        <Box pt={2} pb={2} whiteSpace="pre-line">
          <Typography>
            {'マンネリ化してしまうオンライン飲み会\n話したい話題やキニナル質問でもっと盛り上げよう！'}
          </Typography>
        </Box>
        <ConversionButton
          buttonColor="primary"
          buttonText="いますぐ部屋をつくる"
          onClickButtonHandler={() => onClickConversionButto()}
        />
        <Box mt={1}>
          <Typography
            color="secondary"
            className={classes.textUnderline}
            onClick={() => setIsOpenExistingRoom(true)}
          >
            作成済みの部屋に入る
          </Typography>
        </Box>
      </Box>
    </Fragment>
  )
}
