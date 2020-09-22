import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUsersService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with repeated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUsersService.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    await expect(
      createUsersService.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
