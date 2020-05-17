export class Validation {
  static formValidate = (type, value) => {
    switch (type) {
      case 'member':
        return memberNameValidation(value);
      case 'message':
        return messageValidation(value);
      default:
        return ''
    }
  };
}

const memberNameValidation = (name) => {
  if (!name) return '名前を入力してください';

  if (name.length > 20) return '20文字以内にしてください';

  return '';
};

const messageValidation = (message) => {
  if (!message) return 'メッセージを入力してください';

  if (message.length > 100) return '100文字以内にしてください';

  return '';
};
