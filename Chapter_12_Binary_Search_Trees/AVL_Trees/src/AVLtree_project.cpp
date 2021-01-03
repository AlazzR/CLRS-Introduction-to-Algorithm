#include "AVLtree_project.hpp"
///////////////Node struct//////////////////////////////////
void Node::left_rotate()
{
    std::cout << "\tLeft rotate on: " << this;
    if(this->left != 0)
        std::cout << "\tLeft node: " << this->left;
    else
        std::cout << "\tLeft node: " << 0 << std::endl;
    if(this->right != 0)
        std::cout << "\tRight node: " << this->right;
    else
        std::cout << "\tRight node: " << 0 << std::endl;
    Node* pNode = this->parent;
    if(this->right != 0)
    {
        Node* lRightChild = this->right->left;
        if(this->parent!=0)
        {
            if(this->parent->left == this)
                this->parent->left = this->right;
            else
                this->parent->right = this->right;
        }

        this->right->parent = pNode;
        this->parent = this->right;
        this->right->left = this;
        this->right = lRightChild;
        if(lRightChild != 0)
            lRightChild->parent = this;
        this->updateHeight();
        this->parent->updateHeight();
    }
}
void Node::right_rotate()
{
    std::cout << "\tRight rotate on: " << this;
    if(this->left != 0)
        std::cout << "\tLeft node: " << this->left;
    else
        std::cout << "\tLeft node: " << 0 << std::endl;
    if(this->right != 0)
        std::cout << "\tRight node: " << this->right;
    else
        std::cout << "\tRight node: " << 0 << std::endl; 
    Node* pNode = this->parent;
    if(this->left != 0)
    {
        Node* rLeftChild = this->left->right;
        if(this->parent!=0)
        {
            if(this->parent->left == this)
                this->parent->left = this->left;
            else
                this->parent->right = this->left;
        }
        this->left->parent = pNode;
        this->parent = this->left;
        this->left->right = this;
        this->left = rLeftChild;
        if(rLeftChild != 0)
            rLeftChild->parent = this;
        this->updateHeight();
        this->parent->updateHeight();
    }
}
///////////////AVLTree class//////////////////////////////////
std::ostream&  operator<<(std::ostream& out, const Node* node)
{
    out << "The key is: " << node->key << " and the size of this node is: " << node->size << std::endl;
    return out;
}

std::ostream& operator<<(std::ostream& out, AVLTree& tree)
{
    std::vector<Node*> orderedNodes;
    orderedNodes = tree.inOrderWalk(0);
    for(auto node: orderedNodes)
        out << node;
    return out;
}
//////////////////////////////////////////////////////////////
AVLTree::AVLTree(Node* n)
{
    if(n != 0)
        this->root = n;
    else
        this->root = 0;
}
////////////////////////////////
void AVLTree::updateHeight(Node* node)
{
    if(node == (Node*)0)
        return;
    else
    {
        int ls, rs;
        if(node->left == 0)
            ls = -1;
        else
            ls = node->left->size;
        if(node->right == 0)
            rs = -1; 
        else 
            rs = node->right->size;
        node->size = std::max(ls, rs) + 1;
    }
}
void AVLTree::rebalanceTree(Node* node){
    while(node != 0)
    {
        this->updateHeight(node);
        //Left heavy
        int ls = -1;
        int rs = -1;
        if(node->left != 0)
            ls = node->left->size;
        if(node->right != 0)
            rs = node->right->size;
        if(ls >= 2 + rs)
        {
            //Two cases happen in this situation
                //1)The left child of this node is heavier due to its left child
                //2)The left child of this node is heavier due to its right child
            int lsls = -1;int lsrs = -1;
            if(node->left->left != 0)
                lsls = node->left->left->size;
            if(node->left->right != 0)
                lsrs = node->left->right->size;
            if(lsls >= lsrs)
            {
                //case 1
                node->right_rotate();
                if(node->parent->parent == 0)
                    this->root = node->parent;
            }
            else
            {
                //case 2
                node->left->left_rotate();
                node->right_rotate();
                if(node->parent->parent == 0)
                    this->root = node->parent;
            }
            
        }
        else if(rs >= 2 + ls)
        {
            //Two cases happen in this situation
                //1)The right child of this node is heavier due to its right child
                //2)The right child of this node is heavier due to its left child
            int rsrs = -1;int rsls = -1;
            if(node->right->right != 0)
                rsrs = node->right->right->size;
            if(node->right->left != 0)
                rsls = node->right->left->size;
            if(rsrs >= rsls)
            {
                //case 1
                node->left_rotate();
                if(node->parent->parent == 0)
                    this->root = node->parent;
            }
            else
            {
                //case 2
                node->right->right_rotate();
                node->left_rotate();
                if(node->parent->parent == 0)
                    this->root = node->parent;
            }
            
        }
        node = node->parent;//Need to go recursively till we achieve |Nl - Nr|<1
    }

}

void AVLTree::insertNode(Node* node)
{
    Node* tmpNode;
    tmpNode = node;
    if(root == 0)
        root = tmpNode; 
    else
    {
        Node* lastNode;
        Node* nodeBeforeLast;
        lastNode = this->root;
        while(lastNode != 0)
        {
            nodeBeforeLast = lastNode;
            if(lastNode->key > node->key)
                lastNode = lastNode->left;
            else
                lastNode = lastNode->right;
        }
        //After discovering the appropriate last node, we need to check whether the new node on the left or right of the before last node.
        if(nodeBeforeLast->key > node->key)
        {
            nodeBeforeLast->left = tmpNode;        }
        else 
            nodeBeforeLast->right = tmpNode;
        tmpNode->parent = nodeBeforeLast;
        //We need to update the BST to be AVL.
    }
    rebalanceTree(tmpNode);
    std::cout << "Insert Node: " <<tmpNode;
}
Node* AVLTree::deleteNode(Node* node){
    std::function<void(AVLTree*, Node*, Node*)> pseudoTree;
    pseudoTree = [](AVLTree* T, Node* z, Node* y)
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

    Node* z;
    z = this->search(node);
    if(z != 0)
    {
        if(z->left == 0)
        {
            pseudoTree(this, z, z->right);//This case is easy in which we will simply move the right of node z to be in place of z.
            Node* t;
            t = z->right;
            this->rebalanceTree(t);
            delete z;
            return t;
        }
        else if (z->right == 0)
        {
            pseudoTree(this, z, z->left);//This will replace z by its left child
            Node* t;
            t = z->left;
            this->rebalanceTree(t);
            delete z;
            return t;
        }
        else{
            //Now, the case that the left and right of z aren't NIL, so, we need to replace z by the smallest child of its right family to ensure that the RI still holds.
            Node* y;
            y =  this->find_min(z->right);

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
            this->rebalanceTree(y);
            delete z;
            return y;
        }
    }
    else{
        //Node with this key wasn't found.
        return NULL;
        
    }
}
////////////////////////////////
void AVLTree::setRoot(Node* node)
{
    this->root = node;
}

Node* AVLTree::find_min(Node* node){
    if(node == 0)
        node = this->root;
    while(node->left != 0)
        node = node->left;
    return node;
}

Node* AVLTree::find_max(Node* node){
    if(node == 0)
        node = this->root;
    while(node->right != 0 )
        node = node->right;
    return node;
}

std::vector<Node*> AVLTree::inOrderWalk(Node* node){
    if(node == 0)
        node = this->root;
    std::vector<Node*> orderedNodes;
    node->inOrderWalk(orderedNodes, node);
    return orderedNodes;
}
Node* AVLTree::search(Node* node)
{
    Node* n = this->root;
    while(n != 0)
    {
        if(n->key == node->key)
            return n;
        else if(n->key > node->key)
            n = n->left;
        else
            n = n->right;
   }
   return 0;

}
//Find the smallest node with a larger value than the matched node
Node* AVLTree::sucessor(Node* node)
{
    Node* n = this->search(node);
    if(n != 0)
    {
        if(n->right != 0)
        {
            Node* matched = this->find_min(n->right);
            return matched;
        }
        else{
            Node* parN = n->parent;
            while(parN->right == n && parN != 0)
            {
                n = parN;
                parN =n->parent;
            }
            return parN;
        }
    }
    else{
        std::cout << "This tree doesn't have the following node\n"<<node;
        return 0;
    }
}
//Find the largest node with a smaller value than the matched node

Node* AVLTree::predecessor(Node* node)
{
    Node* n = this->search(node);
    if(n != 0)
    {
        if(n->left != 0)
        {
            Node* matched = this->find_max(n->left);
            return matched;
        }
        else{
            Node* parN = n->parent;
            //Find the smallest node with the larger value than the matched node
            while(parN->left == n && parN != 0)
            {
                n = parN;
                parN =n->parent;
            }
            return parN;
        }
    }
    else{
        std::cout << "This tree doesn't have the following node\n"<<node;
        return 0;
    }
}

AVLTree::~AVLTree()
{
    std::cout << "We are currently clearing the heap from this AVLTree\n";
    if(root != 0)
    {
        std::cout << "------------------------------------" << std::endl;
        for(Node* n=this->root; n!=0;){
            //std::pair<Node, Node*> impNodes = this->deleteNode(n);
            //n = impNodes.second;
            n = this->deleteNode(n);

        }
        std::cout << "------------------------------------" << std::endl;

    }
    else{
        std::cout << "This tree is empty" << std::endl;
    }

}