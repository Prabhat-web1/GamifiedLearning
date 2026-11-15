export interface CodingChallenge {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  description: string
  examples: { input: string; output: string; explanation?: string }[]
  starterCode: string
  solution?: string
  hints: string[]
  xpReward: number
  timeLimit: number // in minutes
  completionRate: number // percentage
  tags: string[]
}

export const categories = [
  { id: 'all', name: 'All Challenges', count: 15 },
  { id: 'arrays', name: 'Arrays', count: 4 },
  { id: 'strings', name: 'Strings', count: 3 },
  { id: 'trees', name: 'Trees', count: 2 },
  { id: 'linked-lists', name: 'Linked Lists', count: 2 },
  { id: 'dynamic-programming', name: 'Dynamic Programming', count: 2 },
  { id: 'graphs', name: 'Graphs', count: 2 },
]

export const challenges: CodingChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    category: 'arrays',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    hints: [
      'Think about using a hash map to store values you have seen',
      'For each number, check if (target - number) exists in your map',
      'The time complexity can be O(n) with the right approach',
    ],
    xpReward: 30,
    timeLimit: 15,
    completionRate: 78,
    tags: ['Hash Table', 'Array'],
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    category: 'strings',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "(]"',
        output: 'false',
      },
    ],
    starterCode: `function isValid(s) {
  // Your code here
  
}`,
    hints: [
      'Use a stack data structure',
      'Push opening brackets, pop for closing brackets',
      'Check if the popped bracket matches the closing bracket',
    ],
    xpReward: 25,
    timeLimit: 10,
    completionRate: 82,
    tags: ['Stack', 'String'],
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    category: 'linked-lists',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]',
      },
      {
        input: 'head = [1,2]',
        output: '[2,1]',
      },
      {
        input: 'head = []',
        output: '[]',
      },
    ],
    starterCode: `function reverseList(head) {
  // Your code here
  
}`,
    hints: [
      'Use three pointers: prev, current, and next',
      'Iterate through the list and reverse the direction of each node',
      'Consider both iterative and recursive approaches',
    ],
    xpReward: 30,
    timeLimit: 15,
    completionRate: 75,
    tags: ['Linked List', 'Recursion'],
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'easy',
    category: 'arrays',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4',
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1',
      },
    ],
    starterCode: `function search(nums, target) {
  // Your code here
  
}`,
    hints: [
      'Use two pointers: left and right',
      'Calculate mid and compare with target',
      'Adjust left or right based on comparison',
    ],
    xpReward: 25,
    timeLimit: 10,
    completionRate: 85,
    tags: ['Binary Search', 'Array'],
  },
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'medium',
    category: 'arrays',
    description: `Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].',
      },
      {
        input: 'intervals = [[1,4],[4,5]]',
        output: '[[1,5]]',
        explanation: 'Intervals [1,4] and [4,5] are considered overlapping.',
      },
    ],
    starterCode: `function merge(intervals) {
  // Your code here
  
}`,
    hints: [
      'Sort intervals by start time first',
      'Compare end of current interval with start of next',
      'Merge if overlapping, otherwise add to result',
    ],
    xpReward: 50,
    timeLimit: 25,
    completionRate: 62,
    tags: ['Array', 'Sorting'],
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    category: 'strings',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
  
}`,
    hints: [
      'Use sliding window technique',
      'Use a Set or Map to track characters in current window',
      'Move right pointer to expand, left pointer to shrink',
    ],
    xpReward: 50,
    timeLimit: 25,
    completionRate: 58,
    tags: ['Hash Table', 'String', 'Sliding Window'],
  },
  {
    id: 'binary-tree-level-order',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    category: 'trees',
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
      {
        input: 'root = [1]',
        output: '[[1]]',
      },
      {
        input: 'root = []',
        output: '[]',
      },
    ],
    starterCode: `function levelOrder(root) {
  // Your code here
  
}`,
    hints: [
      'Use BFS with a queue',
      'Track the number of nodes at each level',
      'Process all nodes at current level before moving to next',
    ],
    xpReward: 45,
    timeLimit: 20,
    completionRate: 65,
    tags: ['Tree', 'BFS', 'Binary Tree'],
  },
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    category: 'dynamic-programming',
    description: `You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        input: 'n = 2',
        output: '2',
        explanation: 'There are two ways to climb to the top: 1+1 and 2.',
      },
      {
        input: 'n = 3',
        output: '3',
        explanation: 'There are three ways: 1+1+1, 1+2, and 2+1.',
      },
    ],
    starterCode: `function climbStairs(n) {
  // Your code here
  
}`,
    hints: [
      'This is similar to the Fibonacci sequence',
      'dp[i] = dp[i-1] + dp[i-2]',
      'You can optimize space to O(1)',
    ],
    xpReward: 25,
    timeLimit: 10,
    completionRate: 80,
    tags: ['Dynamic Programming', 'Math'],
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'medium',
    category: 'dynamic-programming',
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1',
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
      },
    ],
    starterCode: `function coinChange(coins, amount) {
  // Your code here
  
}`,
    hints: [
      'Use dynamic programming with dp array of size amount + 1',
      'Initialize with Infinity except dp[0] = 0',
      'For each amount, try all coins and find minimum',
    ],
    xpReward: 55,
    timeLimit: 30,
    completionRate: 52,
    tags: ['Dynamic Programming', 'Array', 'BFS'],
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    category: 'graphs',
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: '1',
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: '3',
      },
    ],
    starterCode: `function numIslands(grid) {
  // Your code here
  
}`,
    hints: [
      'Use DFS or BFS to explore connected land cells',
      'Mark visited cells to avoid counting them again',
      'Increment island count each time you find an unvisited land cell',
    ],
    xpReward: 50,
    timeLimit: 25,
    completionRate: 60,
    tags: ['Array', 'DFS', 'BFS', 'Union Find'],
  },
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    category: 'trees',
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      {
        input: 'root = [2,1,3]',
        output: 'true',
      },
      {
        input: 'root = [5,1,4,null,null,3,6]',
        output: 'false',
        explanation: 'The root node value is 5 but its right child value is 4.',
      },
    ],
    starterCode: `function isValidBST(root) {
  // Your code here
  
}`,
    hints: [
      'Track the valid range for each node (min, max)',
      'Left child must be less than current, right must be greater',
      'Recursively validate both subtrees with updated ranges',
    ],
    xpReward: 45,
    timeLimit: 20,
    completionRate: 55,
    tags: ['Tree', 'DFS', 'Binary Search Tree'],
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'hard',
    category: 'linked-lists',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.`,
    examples: [
      {
        input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      },
    ],
    starterCode: `class LRUCache {
  constructor(capacity) {
    // Your code here
  }
  
  get(key) {
    // Your code here
  }
  
  put(key, value) {
    // Your code here
  }
}`,
    hints: [
      'Use a combination of HashMap and Doubly Linked List',
      'HashMap gives O(1) access, LinkedList maintains order',
      'Move accessed nodes to front, remove from back when full',
    ],
    xpReward: 80,
    timeLimit: 45,
    completionRate: 35,
    tags: ['Hash Table', 'Linked List', 'Design'],
  },
  {
    id: 'word-search',
    title: 'Word Search',
    difficulty: 'medium',
    category: 'graphs',
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"`,
        output: 'true',
      },
      {
        input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"`,
        output: 'true',
      },
      {
        input: `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"`,
        output: 'false',
      },
    ],
    starterCode: `function exist(board, word) {
  // Your code here
  
}`,
    hints: [
      'Use backtracking with DFS',
      'Mark cells as visited during exploration',
      'Unmark cells when backtracking',
    ],
    xpReward: 55,
    timeLimit: 30,
    completionRate: 48,
    tags: ['Array', 'Backtracking', 'Matrix'],
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'hard',
    category: 'arrays',
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The elevation map can trap 6 units of rain water.',
      },
      {
        input: 'height = [4,2,0,3,2,5]',
        output: '9',
      },
    ],
    starterCode: `function trap(height) {
  // Your code here
  
}`,
    hints: [
      'Water at each position = min(maxLeft, maxRight) - height',
      'Precompute max heights from left and right',
      'Two pointer approach can achieve O(1) space',
    ],
    xpReward: 85,
    timeLimit: 40,
    completionRate: 38,
    tags: ['Array', 'Two Pointers', 'Dynamic Programming', 'Stack'],
  },
  {
    id: 'palindrome-string',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    category: 'strings',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    hints: [
      'Convert to lowercase and filter alphanumeric characters',
      'Use two pointers from both ends',
      'Compare characters moving towards center',
    ],
    xpReward: 20,
    timeLimit: 10,
    completionRate: 88,
    tags: ['Two Pointers', 'String'],
  },
]

export const difficultyConfig = {
  easy: { color: 'text-green-500 bg-green-500/10 border-green-500/30', xpMultiplier: 1 },
  medium: { color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30', xpMultiplier: 1.5 },
  hard: { color: 'text-red-500 bg-red-500/10 border-red-500/30', xpMultiplier: 2 },
}
