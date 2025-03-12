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