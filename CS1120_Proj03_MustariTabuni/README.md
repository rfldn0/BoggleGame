
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
