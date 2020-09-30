import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const johnDoe = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    const janeDoe = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@doe.com',
      password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Jim Morrison',
      email: 'jim@morrison.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([johnDoe, janeDoe]);
  });
});
