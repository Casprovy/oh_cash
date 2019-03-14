# OhCash

Crowdfunding mobile p2p lending solution. The app allows for adding projects to apply for a crowdfunding financing.

![startscr](readme-images/startscr.PNG)
![startscr](readme-images/basket.PNG)
![startscr](readme-images/invest.PNG)
![startscr](readme-images/login.PNG)
![startscr](readme-images/revolut.PNG)

### Running the app

Run `npm install -g expo-cli` if no Expo CLI installed.

If you prefer not to use **Xcode iOS simulator**, install **Expo** app on your smartphone.

Install required dependencies running `npm install` from the project directory.

Start the server by running `/server/index.js` and the front end with `npm start`.

Make sure the server and the smartphone run on the same network and change the url in the `reducer.js` to the proper IP.

The mock data for projects load from the external **MongoDB** in **mLab**, so you need to have a running WIFI connection.

## Tech stack

**Front-end**

* [React-Native](https://facebook.github.io/react-native/)
* [Redux](https://redux.js.org/)

Front-end components are located in the `screens` folder.

**Back-end**

* [Node.js](https://nodejs.org/en/)
* [Koa](https://koajs.com/)
* [Mongoose](https://mongoosejs.com/)
* [mLab](https://mlab.com/)

Back-end files are located in the `server` folder.

### Notes

To enable the Google login feature you need to input your Google ID token in the `env.js` file and change the `initialRouteName` in `\navigation\AppNavigator.js` to `Auth`.

Not tested on Android! The app contains some original filenames as created by Expo which may not always refer to what is seen on the screen.
