import {
  RANDOM_POST_TITLE,
  RANDOM_FIRST_MESSAGE,
} from '../constants';

export class RandomText {
  static extractText = (type) => {
    switch (type) {
      case 'title':
        return randomPostTitle();
      case 'message':
        return randomMessageBody();
    }
  };
}

const randomPostTitle = () => {
  return RANDOM_POST_TITLE[Math.floor(Math.random() * RANDOM_POST_TITLE.length)];
};

const randomMessageBody = () => {
  var result = [];
  for (var i = 0; i < 3; i++) {
    var arrayIndex = Math.floor(Math.random() * RANDOM_FIRST_MESSAGE.length);
    result[i] = RANDOM_FIRST_MESSAGE[arrayIndex];
    RANDOM_FIRST_MESSAGE.splice(arrayIndex, 1);
  }
  return result;
};
