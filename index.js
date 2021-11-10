// import express
const express = require('express');
const app = express();

// import static database
const users = require('./db/users.json');

// import models
const { UserGame, UserGameBiodata } = require('./models');

// use form encoded middleware
app.use(express.urlencoded({ extended: false }));

// set ejs as view engine
app.set('view engine', 'ejs');

// page render
app.get('/', (req, res) => {
  res.render('main/index');
});

app.get('/login', (req, res) => {
  const errorType = req.query.error;
  let errorMessage = '';

  if (errorType === 'user') {
    errorMessage = 'Not registered';
  }

  if (errorType === 'password') {
    errorMessage = 'Incorrect password';
  }

  res.render('main/login', { message: errorMessage });
});

app.get('/dashboard/index', (req, res) => {
  UserGame.findAll().then((data) => {
    res.render('dashboard/index', { users: data })
  })
});

app.get('/dashboard/create', (req, res) => {
  res.render('dashboard/create');
});

app.get('/dashboard/update/:id', (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
    include: {
      model: UserGameBiodata,
      as: 'user_game_biodata'
    }
  }).then((data) => {
    res.render('dashboard/update', { data });
  });
});

app.get('/dashboard/detail/:id', (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
    include: {
      model: UserGameBiodata,
      as: 'user_game_biodata'
    }
  }).then((data) => {
    res.render('dashboard/detail', { data });
  });
});

// api
app.post('/dashboard/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userFound = users.find((user) => {
    return user.username == username;
  })

  if (!userFound) {
    return res.redirect('/login?error=user');
  }

  if (userFound.password != password) {
    return res.redirect('/login?error=password');
  }

  res.redirect('/dashboard/index');
});

app.post('/dashboard/create', (req, res) => {
  UserGame.create({
    username: req.body.username,
    password: req.body.password,

    // menyatakan table yg ikut dioperasikan, harus sesuai dengan nama tabel, meskipun melanggar naming convention
    user_game_biodata: {
      name: req.body.name,
    }
  }, {
    // menjelaskan nama model & tabel yang ikut dioperasikan
    include: {
      model: UserGameBiodata,
      as: 'user_game_biodata'
    }
  }).then(() => {
    res.redirect('/dashboard/index');
  });
});

app.post('/dashboard/update/:id', (req, res) => {
  // Tidak memungkinkan menggunakan include dalam proses update, alternatifnya gunakan operasi tabel berurutan

  // Update user game dulu
  UserGame.update({
    username: req.body.username,
    password: req.body.password,
  }, {
    where: { id: req.params.id },
  }).then(() => {
    // Kemudian update user game biodata
    UserGameBiodata.update({
      name: req.body.name,
    }, {
      where: { user_id: req.params.id },
    }).then(() => {
      res.redirect('/dashboard/index');
    });
  });
});

app.get('/dashboard/delete/:id', (req, res) => {
  // Tidak memungkinkan menggunakan include dalam proses delete, alternatifnya gunakan operasi tabel berurutan, namun terbalik dari update
  // Karena data yang dijadikan referensi harus dihapus terakhir

  // delete user game biodata dulu
  UserGameBiodata.destroy({
    where: { user_id: req.params.id },
  }).then(() => {
    // Kemudian delete user game
    UserGame.destroy({
      where: { id: req.params.id },
    }).then(() => {
      res.redirect('/dashboard/index');
    });
  });
});

// run app in port 3000
app.listen(3000, () => {
  console.log('App is running in http://localhost:3000');
})