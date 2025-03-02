import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const commitDates = [
  moment("2025-03-01"),
  moment("2025-03-01"),
];

const makeCommits = (dateIndex, remainingCommits) => {
  if (dateIndex >= commitDates.length) {
    return simpleGit().push(); // Push and exit when done
  }
  
  if (remainingCommits === 0) {
    return makeCommits(dateIndex + 1, 3); // Move to next date
  }

  const dateString = commitDates[dateIndex].format();
  console.log(`Committing on: ${dateString}, Remaining: ${remainingCommits}`);

  const data = { date: dateString };
  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(dateString, { "--date": dateString }, () => {
        makeCommits(dateIndex, remainingCommits - 1); // Continue committing
      });
  });
};

makeCommits(0, 3);
