
# MoreThanWords
A Tufts JumboCode 2020-2021 project for More than Words.
## Welcome
Welcome to the More than Words projects, a project run through [Tufts JumboCode](https://www.jumbocode.org). Here are some steps to get you started.

## The Team
Current team members:
* PM: Titapa (PunPun) Chaiyakiturajai
* Tech Lead: Jacqueline Chin
* Developer: Yichen Wei

## Recommended Software 
- [SourceTree](https://www.sourcetreeapp.com) (free)

### Easy Setup
1. Open App.js in the `frontend` folder and replace 
`YOUR.LOCAL.IP.ADDRESS` 
with 
your Local IP Address which can be found in System Preference > Network
2. Terminal window 2: `sh startBackend.sh`
3. Terminal window 3: `sh startFrontend.sh`

## Building the Project 
- React Native (frontend)
- Flask (backend, Python)

### Details 

## Contributing 
We're using issue trackers on GitHub to track the issues and stories as they come up and through during the sprint.

### Making a Branch 
Make branches with Sourcetree or on the command line. If you're on the command line:
```
git checkout staging
git pull
git checkout -b mtw-01
```

This will go to our staging branch, pull the latest version, and `checkout` (switch) to a new branch (in this case `mtw-01`).

Make your branches the same name as the ticket # you're working on.
> Issue #1 is on branch mtw-01

Note: you should only be branching and merging into the staging branch. Nothig should ever go direcly into the production branch.

### Committing
Commit early and often on your feature branch! Commit with the help of SourceTree (I'll give instructions) or through the command line.
```
sh setup.sh
git add .
git commit -m "#2, added a comment"
git push
```
If git tells you to do something like:
```
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin mtw-01
```
Just run the command they specify and you should be good to go.

#### Commit Messages
Your commit message should A) reference the issue and B) be meaningful


### Pull Requests
Think your code is good to go? Great! Let's just get someone to take a look at it before it gets merged with the staging branch.

 - Go to the GitHub page
 - If you don't see your recently updated branch, go to the `branches` tab and find your branch.
 - Click on `compare and make pull request`
 - Here, you can compare the branches -- your branch vs a specified branch (usually `staging`)
 - If you're good to go, title the PR (Pull Request) with the ticket # and name it the same name as the ticket name.
 - Enter in corresponding information, including what you did and what your reviewer can do to test it
 - `Create Pull Request`
 - Select who you want to review your code!
