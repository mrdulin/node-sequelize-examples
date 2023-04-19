import bcrypt from 'bcrypt';

const logEvent = { emit(event, payload) {} };

class UserService {
  user;
  constructor(user) {
    this.user = user;
  }
  async updateUser(user) {
    let result;
    try {
      const pass = bcrypt.hashSync(user.userPassword, 9);
      result = await this.user.findByPk(user.id);
      if (result) {
        result.userPassword = pass;
        await result.save();

        return result;
      }
    } catch (e) {
      logEvent.emit('APP_ERROR', {
        logTitle: '[UPDATE-USER-FAILED]',
        logMessage: e,
      });

      throw new Error(e);
    }
  }
}
export { UserService };
