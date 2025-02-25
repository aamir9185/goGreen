import jsonfile from "jsonfile"
import moment from "moment"
import simpleGit from "simple-git"
import random from "random"

const path = "./data.json"

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push(); 

  const startDate = moment("2024-01-01"); 
  const endDate = moment("2024-12-31");   

  const randomDate = moment(startDate).add(random.int(0, endDate.diff(startDate, "days")), "days");

  if (random.float() < 0.3) {
    return makeCommits(n); 
  }

  const dateString = randomDate.format();

  const commitsToday = random.int(1, 5); 

  console.log(`Committing ${commitsToday} times on: ${dateString}`);

  const commitRecursively = (remainingCommits) => {
    if (remainingCommits === 0) {
      return makeCommits(n - commitsToday)
    }

    const data = { date: dateString };

    jsonfile.writeFile(path, data, () => {
      simpleGit()
        .add([path])
        .commit(dateString, { "--date": dateString }, () => commitRecursively(remainingCommits - 1));
    });
  };

  commitRecursively(commitsToday);
};

makeCommits(200);
