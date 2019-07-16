export default {
  format(error) {
    switch (error.name) {
      case 'InvalidCredentialsError':
        return { type: 'InvalidCredentialsError' };
      case 'ResourceNotFoundError':
        return { type: 'resetPasswordTokenExpired' };
      case 'ResourceAlreadyExistsError':
        return { type: 'ResourceAlreadyExistsError' };
      case 'InvalidArgument':
        return { type: 'InvalidArgument' };
      default:
        return { type: 'unknownError' };
    }
  }
};
