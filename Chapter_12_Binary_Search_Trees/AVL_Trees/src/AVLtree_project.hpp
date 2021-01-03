#ifndef _AVL_Tree_H_
#define _AVL_Tree_H_
#include<iostream>
#include<vector>
#include<limits>
#include<functional>

struct Node{
    int key;
    Node* parent;
    Node* left;
    Node* right;
    int size;
    
    Node(int key=0, int size=-1, Node* l=0, Node* r=0, Node* p=0){
        this->key = key;
        this->left =l;
        this->right = r;
        this->parent = p;
        this->size = size;
    }
    void updateHeight()
    {
        if(this == (Node*)0)
            return;
        else
        {
            int ls, rs;
            if(this->left == 0)
                ls = -1;
            else
                ls = this->left->size;
            if(this->right == 0)
                rs = -1; 
            else 
                rs = this->right->size;
            this->size = std::max(ls, rs) + 1;
        }
    }
    //Recursively get the ascending order accoring to their keys.
    void inOrderWalk(std::vector<Node*>& orderedNodes, Node* node)
    {
        if(node == 0)
            return;
        inOrderWalk(orderedNodes, node->left);
        orderedNodes.push_back(node);
        inOrderWalk(orderedNodes, node->right);
    }
    //Used only at time of insertion
    void updateSize(Node* n){
        n->size = std::max(n->left->size, n->right->size) + 1;
    }
    friend std::ostream& operator<<(std::ostream& out, const Node* node);//I will only deal with heap allocations
    ~Node()
    {
        std::cout << this << std::endl;
    }
    void left_rotate();
    void right_rotate();
};


class AVLTree{
    private:
        Node* root;
    public:
        AVLTree(Node* node = 0);
        //Updating Methods
        void insertNode(Node* node);
        Node* deleteNode(Node* node);
        void updateHeight(Node* node);
        void rebalanceTree(Node* node);
        //Qureies Methods
        Node* find_min(Node* node = 0);
        Node* find_max(Node* node = 0);
        std::vector<Node*> inOrderWalk(Node* node);
        Node* search(Node* node);
        Node* sucessor(Node* node);
        Node* predecessor(Node* node);
        //Setters and getters
        void setRoot(Node* node);
        Node* getRoot()
        {
            return this->root;
        }
        //Printing methods
        friend std::ostream& operator<<(std::ostream& out, AVLTree& tree);

        ~AVLTree();
};

#endif /*_AVL_Tree_H_*/