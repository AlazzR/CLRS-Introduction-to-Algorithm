#%%
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def insert_Node(self, val):
        parent = None
        tmp = self
        while(tmp != None):
            if(tmp.val < val):
                if tmp.right == None:
                    parent = tmp
                    tmp = TreeNode(val, None, None)
                    parent.right = tmp
                tmp = tmp.right
            else:
                if tmp.left == None:
                    parent = tmp
                    tmp = TreeNode(val, None, None)
                    parent.left = tmp
                tmp = tmp.left
    
    def height(self, node):
        if node == None:
            return 0
        
        return max(self.height(node.left), self.height(node.right)) + 1
    
    def display(self):
        diff = 16
        start = 50
        c = ' '

        this_level = [(self, start)]

        while this_level:
            next_level = list()
            last_line = ''

            for node, d in this_level:
                line = last_line + c*(d - len(last_line)) + str(node.val)
                print(line, end='\r')
                last_line = line

                if node.left:
                    next_level.append((node.left, d - diff))
                if node.right:
                    next_level.append((node.right, d + diff))
                this_level = next_level
                diff = max(diff//2, 2)
            print('\n')

def traverse_bst(root):
        if root == None:
            return
        traverse_bst(root.left)
        print(root.val)
        traverse_bst(root.right)
    
#%%
#ordered of the tree
root = TreeNode(4)
root.insert_Node(2)
root.insert_Node(7)
root.insert_Node(1)
root.insert_Node(3)
root.insert_Node(6)
root.insert_Node(9)

traverse_bst(root)

root.height(root)
print("The tree from " + "https://stackoverflow.com/questions/4965335/how-to-print-binary-tree-diagram")
root.display()
#%%
# Definition for a binary tree node.

def invertTree(root):
    if root == None:
        return root
    
    tmpLeft = invertTree(root.left)
    tmpRight = invertTree(root.right)
    root.left = tmpRight
    root.right = tmpLeft

    return root

# a more robust solution using stacks, It was suggested in leetcode

def stackDFS(root):
    if root == None:
        return None
    
    stack = []
    stack.append(root)
    
    while( len(stack) != 0 ):
        node = stack.pop()
        tmp = node.left
        node.left = node.right
        node.right = tmp

        if( node.left != None):
            stack.append(node.left)
        if( node.right != None ):
            stack.append(node.right)

    return root
#invertTree(root)
stackDFS(root)
root.display()

# %%
