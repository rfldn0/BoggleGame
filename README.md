
# **BOGGLE GAME SPECIFICATIONS**

## **Game Overview**

- The game consists of a **4x4 board** (16 cubic dice) filled with **randomized uppercase letters**.
- Players attempt to **find words** by forming sequences of **adjacent letters** (horizontally or vertically).
- **No diagonal movements** are allowed.
- Each letter in a word must be **a neighbor of the previous letter**.
- A **letter may not be used more than once** in a single word.

---

## **Game Features to Implement**

### **User Input**

- **Enter a seed** to randomize the letters (used for testing consistency).

### **Board Generation**

- Generate a **randomized 4x4 board** using uppercase letters.
- Display the board after generation.

### **Word Validation**

- Players input a word: `guess_the_word`.
- A valid word must:
    - **Start from any position** on the board.
    - **Each subsequent letter must be a neighbor** (horizontally or vertically).
    - **No letter may be used more than once**.

### **Validation Results**

- If the word is **valid** (`isValid = True`):
    - Print `"Nice job!"` and display the board.
- If the word is **invalid**:
    - Print `"I don't see that word."`
    - Print `"Are we looking at the same board?"`

---

## **Palindrome Check**

- A **recursive function** (`isPalindrome(word: str)`) will check if the word is a **palindrome** (reads the same forward and backward).
- This function should:
    - Accept only **one string argument**.
    - Use **recursion** to determine if the word is a palindrome.

---

## **Program Flow**

1. **Enter a seed** (for predictable randomization).
2. **Generate the board** (randomized 4x4 grid of letters).
3. **Player enters a word**.
4. **Validate the word**:
    - **If valid**: Print `"Nice job!"` and display the board.
    - **If invalid**: Print `"I don't see that word."`
5. **Check if the word is a palindrome** using recursion.
6. **If the word is valid, print the board**; otherwise, print `"Are we looking at the same board?"`

---

## **Additional Implementation Details**

### **1. Error Handling (Try-Except Blocks)**

- **Incorrect letter case**: If a user enters **lowercase letters**, raise an error.
- **Wrong data type**: Handle cases where the input is not a valid string of uppercase letters.

### **2. Two Parallel 2D Arrays**

- One array for **storing the randomized board** (letters).
- Another **boolean 2D array** to track which cells have been **visited** during word validation.

### **3. Recursive Word Search**

- **A recursive method** will:
    - Traverse the board and check if a word can be formed.
    - Validate **each letter** based on movement rules.
    - Ensure **no letter is used more than once**.
    - Accept **only one string argument** (the word to be checked).

## CODES And translation: 

I build the algorthm initially in python file, however in order for it to run in the website I would have to translate them into js file. Therefore, I use claude to convert the code to javascript file. You can still look at my python code as it is still presented inside this repo. 


Note: ***Initially this was a school group project***. 

``` 
BoggleBoard.py

# Project No: Project 3 - Boggle Board Game
# Author: Victor & Marissa
# Description: BoggleBoard Game

import string
import random

"""
1. Boggle class includes two dimensional lists of letters
2. Methods for filling and printing the letters. 
3. A method that return a word is valid for the board or not. 
4. Another recursive method to verify the word.
"""

class BoggleBoard:
    def __init__(self, seed): #accepts random int input from user
        #initializes board's body; generate board based on random seed
        self.board = self.generate_board(seed)
        #creata a coinciding list for visited board
        self.visited = [[False for _ in range(4)] for _ in range(4)] # same size four by four


    #method for filling the letters in the board
    def generate_board(self, seed):
        random.seed(seed)
        """     note: we can change the size of the board by make two more fields and arguments called rows and columns. 
                Make them as variable and call them in the main class as integer input from the user which makes the game 
                more flexible."""
        #return the string comprehension and set it as board field
        return [[random.choice(string.ascii_uppercase) for _ in range(4)] for _ in range(4)] #constant board size 4 x 4

    #formated display method
    def print_board(self):
        for row in self.board:
            print("+---+ +---+ +---+ +---+")
            for column in row:
                print("".join(f"| {column} |"), end=" ")
            print("")
        print("+---+ +---+ +---+ +---+")

    def print_marked_board(self, word=""):
        """
        Prints the board and highlights the letters of the valid word by wrapping them in <>.
        Only horizontal and vertical neighbors are considered for word formation.
        """

        # Reset the visited board to track word path
        self.visited = [[False for _ in range(4)] for _ in range(4)]
        positions = [] # Tracks the positions of the letters forming the word

        # Locate the word on the board and mark the positions
        for i in range(4):
            for j in range(4):
                if self.board[i][j] == word[0] and self._locate_word(word, i, j, 0):
                    positions = [(r, c) for r in range(4) for c in range(4) if self.visited[r][c]]

        # Print the board, highlighting the found word's letters
        for i in range(4):
            print("+---+ +---+ +---+ +---+")
            for j in range(4):
                if (i, j) in positions:
                    print(f"|<{self.board[i][j]}>|", end=" ")
                else:
                    print(f"| {self.board[i][j]} |", end=" ")
            print("")
        print("+---+ +---+ +---+ +---+")

    def is_valid_word(self, word): # board will be instantiated in the main class
        visited = self.visited #initialize the visited board which hold the same list as self.visited board
        board = self.board #initialize board as board in is_valid_word
        for i in range(4):
            for j in range(4):
                if board[i][j] == word[0]:
                    if self._locate_word(word, i, j, 0):
                        return True
        return False

    def _locate_word(self, word, row, col, index):
        #base case: after lookup the entire element in the list
        if index == len(word):
            return True
        if row < 0 or row >= 4 or col < 0 or col >= 4 or self.visited[row][col] or self.board[row][col] != word[index]:
            return False

        self.visited[row][col] = True
        #using tuple and list to make a coordinate for directions
        cor = [(-1, 0), (1,0), (0, -1), (0, 1)]

        for left, right in cor:
            if self._locate_word(word, row + left, col + right, index + 1):
                return True

        # Backtracking
        self.visited[row][col] = False
        return False



    #overload palindrome method
    def is_palindrome(self, word):
        return self._is_palindrome(word, 0, len(word) - 1)

    def _is_palindrome(self, word, left, right):
        #Base case the length and the starting index of the word
        if left >= right:
            return True
        #test if word at index a != word at index n is the same return false
        if word[left] != word[right]:
            return False
        #recursive case
        return self._is_palindrome(word, left +1, right -1)
```

```
main.py

# Project No: Project 3 - Boggle Board Game
# Author: Victor & Marissa
# Description: Main function to run the Boggle Board Game

"""
main.py contains following operations
1. create instance of the board
2. display the board
3. input for players to find the words
4. output whether the word is valid or not.
"""

from BoggleBoard import BoggleBoard

#display the resulted board where the word inputted is valid

"""
1. iterate over the valid word
2. find the position of each character in the word.
3. If character found
    3.1 checked the word using '<>' sign.
4. else print normal.
"""


def main():
    seed = int(input("Enter seed: "))
    boggle_board = BoggleBoard(seed)
    boggle_board.print_board()
    word = input("Enter word (in UPPERcase): ").upper()
    if boggle_board.is_valid_word(word):
        print("Nice Job!")
        print(f"The word {word} is {'a palindrome.' if boggle_board.is_palindrome(word) else 'not a palindrome.'}")
        boggle_board.print_marked_board(word)  # print the board with verified letters
    else:
        print(f"I don't see that word.")
        print(f"The word {word} is {'a palindrome.' if boggle_board.is_palindrome(word) else 'not a palindrome.'}")
        print("Are we looking at the same board?")


if __name__ == "__main__":
    main()
```


