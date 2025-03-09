import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

// Generate dates from March 3 to March 9
const commitDates = [];
for (let i = 0; i < 7; i++) {
  commitDates.push(moment("2025-03-03").add(i, "days"));
}

// Function to create commits
const makeCommits = (dateIndex, remainingCommits) => {
  if (dateIndex >= commitDates.length) {
    return git.push(); // Push changes after all commits are done
  }

  if (remainingCommits === 0) {
    return makeCommits(dateIndex + 1, 3); // Move to the next date
  }

  const dateString = commitDates[dateIndex].format();
  console.log(`Committing on: ${dateString}, Remaining: ${remainingCommits}`);

  const data = { date: dateString };
  jsonfile.writeFile(path, data, () => {
    git.add([path])
      .commit(dateString, { "--date": dateString }, () => {
        makeCommits(dateIndex, remainingCommits - 1); // Continue committing
      });
  });
};

makeCommits(0, 3);
