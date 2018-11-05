const mockDatabase = {
  hits: {
    hits: [
      {
        _id: 'YunOisS8ajgkkambA',
        _source: {
          name: 'Vu Anh Dung',
          email: 'dungva1505@gmail.com',
          account: 'dungva',
          password: '123456',
          role: {
            id: 1,
            name: 'Admin',
          },
          status: 'active',
          address: {
            city: 'Ha Noi',
            district: 'Cau Giay',
            commune: 'Xuan Thuy',
            detail: '100 Xuan Thuy',
          },
          phone: '0972726021',
          dateOfBirth: '15/05/1994',
          numPost: 0,
          createdAt: '11/05/2018',
        },
      },
    ],
  },
};

export const getAll = () => {
  return mockDatabase;
};

export const getById = (id) => {
  return mockDatabase[id];
};

export const insert = (body) => {
  mockDatabase.hits.hits.push(body);

  return {
    message: 'success',
  };
};
