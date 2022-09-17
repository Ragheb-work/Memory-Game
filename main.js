// Select The Start Game Button

document.querySelector(".control-buttons span").onclick = function () {
  // Prompt window to ask for name

  let yourName = prompt("What's Your Name ?");

  // if name is empty
  if (yourName == null || yourName == "") {
    // set name to unknown
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    // else set it to your name
    document.querySelector(".name span").innerHTML = yourName;
  }

  // Remove splash screen
  document.querySelector(".control-buttons").remove();
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create range of keys
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add order css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The flip Block
    flipBlock(block);
  });
});

// Flip Block Function

function flipBlock(selectedBlock) {
  // Add the Flip class
  selectedBlock.classList.add("is-flipped");

  // Collect All Flipped Card
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  // if there is two card flipped
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  // wait duration
  setTimeout(() => {
    // Remove Class No Clicking After Duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check Matched Block
function checkMatchedBlocks(first, second) {
  let triesElement = document.querySelector(".tries span");

  if (first.dataset.technology === second.dataset.technology) {
    document.getElementById("success").play();
    first.classList.remove("is-flipped");
    second.classList.remove("is-flipped");

    first.classList.add("has-match");
    second.classList.add("has-match");
  } else {
    document.getElementById("fail").play();
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      first.classList.remove("is-flipped");
      second.classList.remove("is-flipped");
    }, duration);
  }
}

// Shuffle Function
function shuffle(array) {
  // setting vars
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);

    // Decrease Length By One
    current--;

    // [1] Save Current Element in Stash
    temp = array[current];

    // [2] Current Element = sRandom Element
    array[current] = array[random];

    // [3] Random Element = Get Element From Stash
    array[random] = temp;
  }
  return array;
}
