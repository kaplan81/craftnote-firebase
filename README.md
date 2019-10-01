# CraftnoteFirebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

## Up and running

In `src/environments/environment.ts` replace the API key with the one sent to you via email. Then run this commands in your favourite code editor:

```bash
npm i
npm start
```

After that navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Quality Assurance

1) Click on the "Register" button in the automatically opened dialog.
2) Register a user on your own with an email and password of your choice. Read password condidions in the hint note.
3) You will be redirected to the Features view. Don't do anything there yet. Just log out clicking on the top right button.
4) Now click on the "Login" button in the automatically opened dialog.
5) You are redirected to the Features view again. Now try adding a new feature. You should see it immediately in the bar chart which is arranged by importance.
6) Click on the burger menu button (top left) and navigate to the Feedback view.
7) Take a look at the items count on the table.
8) Scroll down and add a new feedback to the table. Try giving it several comma separated feature names. Check that the previously mentioned number of items has increased.
9) Optionally you can check the new entries for feature, feedback and authenticated user in the Firebase database.

And that's it!
