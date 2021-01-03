#ifndef _BST_H_
#define _BST_H_

#include<iostream>
#include<vector>
#include<functional>

struct coordinate{
    uint x, y, z;
    coordinate(uint x=0, uint y=0, uint z=0)
    {
        this->x = x;this->y=y;this->z=z;
    }
    coordinate(const coordinate& pnt){
        this->x = pnt.x;
        this->y = pnt.y;
        this->z = pnt.z;
    }
    friend std::ostream& operator<<(std::ostream& out, coordinate point)
    {
        out << '(' << point.x << ',' << point.y << ',' << point.z << ')' << std::endl;
        return out; 
    }
};

class BSTNode{
    private:
        int key;
        coordinate point;
    public:
        BSTNode* parent;
        BSTNode* left;
        BSTNode* right;
        BSTNode(int k =0, BSTNode* p=0, BSTNode* l=0, BSTNode* r=0, uint x =0, uint y=0, uint z=0);

        //Query methods
        std::vector<BSTNode*> getOrderNodesMin(BSTNode* n) const;
        BSTNode* search(BSTNode*, int) const;
        BSTNode* find_min(BSTNode*) const;
        BSTNode* find_max(BSTNode*) const;

        //Getter and Setters
        coordinate getPoint()
        {
            return point;
        }
        int getKey() const;

        friend std::ostream& operator<<(std::ostream& out, BSTNode* node)
        {
            out << "Key: " << node->key << " coordinate: " << node->point;
            return out;
        }
        ~BSTNode(){
            std::cout << "DELETE: " << this;
        } 
};

class BST{
    private:
        BSTNode* root;
    public:
        BST()
        {
            root = 0;
        }
        BSTNode* search(int key) const;
        //Update methods
        void insert(int k, BSTNode* p=0, BSTNode* l=0, BSTNode* r=0, uint x =0, uint y=0, uint z=0);
        BSTNode* deleteNode(int key);
       
        BSTNode* getRoot(){
            return this->root;
        }
        void setRoot(BSTNode* node)
        {
            this->root = node; //root will point to the address of this node.
        }
        //Query methods
        std::vector<BSTNode*> getOrderNodesMin(BSTNode* n = 0) const;
        BSTNode* find_min() const;
        BSTNode* find_max() const;
        BSTNode* successor(int key) const;
        BSTNode* predecessor(int key) const;

        ~BST(){
            std::cout << "We are currently clearing the heap from this BST\n";
            if(root != 0)
            {
                for(BSTNode* n=root; n!=0;){
                   n = this->deleteNode(root->getKey());
                }
            }
            else{
                std::cout << "This tree is empty" << std::endl;
            }
        }
};




#endif/*_BST_H_*/