#include "BST_Node_and_Tree.h"
void BST::insert(int k, BSTNode* p, BSTNode* l, BSTNode* r, uint x_p, uint y_p, uint z_p)
{

    BSTNode* node;
    if(root == 0)
    {
        node = new BSTNode(k, p, l, r, x_p, y_p, z_p);
        root = node;
    }
    else
    {
        BSTNode* tmp = 0;
        BSTNode* x = this->getRoot();
        while(x != 0){
            //iterative search for an appropriate position for the new node
            tmp = x;//hold the x
            if(x->getKey() > k)
                x = x->left;
            else
                x = x->right;                    
        }

        //We reached the appropriate position in which we know the parent node of x which is kept in tmp, and now we need to check if the tree was empty or whether the node is on the right or left of tmp.
        node = new BSTNode(k, tmp, l, r, x_p, y_p, z_p);
        if(tmp == 0)//Tree is already empty
            this->setRoot(node);

        else if(tmp->getKey() < node->getKey())
        {
            tmp->right = node;
        }
        else
        {
            tmp->left =node;
        }            
    }
}
std::vector<BSTNode*> BST::getOrderNodesMin(BSTNode* n) const{            
    if(n == 0)
    {
        if(root == 0)
        {
            return std::vector<BSTNode*> ();
        }
        else 
            return root->getOrderNodesMin(root);
    }
    else
        return n->getOrderNodesMin(n);             
}
BSTNode* BST::search(int key) const{
    if(root == 0)
        return root;
    else
    {
        return root->search(root, key);
    }
}

BSTNode* BST::find_min() const{
    if(root == 0)
        return root;
    else
    {
        return root->find_min(root);
    }
}
BSTNode* BST::find_max() const{
    if(root == 0)
        return root;
    else
    {
        return root->find_max(root);
    }
}

BSTNode* BST::successor(int key)const{
    //Smallest key that is larger than the key of interest
    BSTNode* node = this->search(key);
    if(node->right != 0)
        return node->find_min(node->right);

    BSTNode* par = node->parent;
    while(par->right == node &&  par!= 0)
    {
        node = par;
        par = node->parent;
    }
    return par;
}

BSTNode* BST::predecessor(int key)const{
    //Largest key that is smaller than the key of interest
    BSTNode* node = this->search(key);
    if(node->left != 0)
        return node->find_max(node->left);
    BSTNode* par = node->parent;
    while(par->left == node &&  par!= 0)
    {
        node = par;
        par = node->parent;
    }
    return par;
} 

BSTNode* BST::deleteNode(int key){
    std::function<void(BST*, BSTNode*, BSTNode*)> pseudoTree;
    pseudoTree = [](BST* T, BSTNode* z, BSTNode* y)
    {
        if(z->parent == 0)
        {
            //z was the root
           T->setRoot(y);
        }    
        else if(z == z->parent->left)
        {
            //make the left of node z to be node y in preparation to delete z
           z->parent->left = y;
        }
        else{
            //make the right of node z to be node y in preparation to delete z
            z->parent->right = y;
        }
        //update the parent of y
        if(y != 0)
        {
            y->parent= z->parent;
        }

    };

    BSTNode* z = this->search(key);
    if(z != 0)
    {
        if(z->left == 0)
        {
            pseudoTree(this, z, z->right);//This case is easy in which we will simply move the right of node z to be in place of z.
            auto t = z->right;
            delete z;
            return t;
        }
        else if (z->right == 0)
        {
            pseudoTree(this, z, z->left);//This will replace z by its left child
            auto t = z->left;
            delete z;
            return t;
        }
        else{
            //Now, the case that the left and right of z aren't NIL, so, we need to replace z by the smallest child of its right family to ensure that the RI still holds.
            auto y = z->find_min(z->right);
            //We need to check if y was direclty under z or not because we need to move y in its place, so, we need to ensure that the childs of y will have the same places when we move them under the parents of y.
            if(y->parent != z){
                //we need to move y to the place of z, while ensuring that the children of y will keep their places.
                pseudoTree(this, y, y->right);
                y->right = z->right;
                y->right->parent= y;
            }
            //Now, we move y in place of z
            pseudoTree(this, z, y);
            y->left = z->left;

            y->left->parent = y;
            delete z;
            return y;
        }
    }
    else{
        //Node with this key wasn't found.
        return NULL;
        
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
BSTNode::BSTNode(int k, BSTNode* p, BSTNode* l, BSTNode* r, uint x, uint y, uint z)
{
    this->key = k;
    this->parent=p;this->left=l;this->right=r;
    this->point = coordinate(x, y, z);
}

int BSTNode::getKey() const{
    return this->key;
}

std::vector<BSTNode*> BSTNode::getOrderNodesMin(BSTNode* n) const
{
    std::vector<BSTNode*> nodes;
    std::function<void(BSTNode*)> f;
    f = [&f, &nodes](BSTNode* node)
    {
        //if we reached the NIL node then recuresively go back till reaching the root.
        if(node != 0)
        {
            f(node->left);//Get all the nodes at the left of the desired node;
            nodes.push_back(node);
            f(node->right);//Go to the largest nodes.
        }
    };
    f(n);
    return nodes;

}

BSTNode* BSTNode::search(BSTNode* n, int key) const{
    if(n == 0 || n->key == key)
        return n;
    else
    {
        if(n->key < key)
            return search(n->right, key);
        else
           return search(n->left, key);
    }
}

BSTNode* BSTNode::find_min(BSTNode* n) const
{
    if(n->left == 0)
        return n;
    else
        return find_min(n->left);
}

BSTNode* BSTNode::find_max(BSTNode* n) const
{
    if(n->right == 0)
        return n;
    else
        return find_max(n->right);
}

