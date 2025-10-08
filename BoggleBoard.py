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
