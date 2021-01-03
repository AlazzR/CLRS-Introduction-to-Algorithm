#include "AVLtree_project.hpp"

int main(int argc, char** argv)
{
    //int keys[10] = {23, 60, 8, 4, 16, 26, 15, 30, 31, 2};
    //int keys[10] = {23, 60, 20, 4, 16, 26, 15, 14, 13, 12};
    //int keys[10] = {23, 60, 20, 19, 18, 17, 16, 15, 14, 10};
    int keys[10] = {2, 2, 2, 2, 26, 30, 30, 30, 30, 30};//I will allow to make when equality happens, then the rotation will allow putting the violated node on other sides.
    AVLTree tree;
    for(int i=0; i < 10; i++)
        tree.insertNode(new Node(keys[i]));
    
    std::cout << std::string(10, '-') + '\n';
    std::cout << "Root: "<< tree.getRoot();

    std::cout << "Min: "<< tree.find_min();
    std::cout << "Max: "<< tree.find_max();
    ///////////////////////////////////////////////////////
    Node* testing = new Node();
    testing->key = 8;
   // std::cout << "Succ(8): "<< tree.sucessor(testing);
    testing->key = 16;
    //std::cout << "Succ(16): "<< tree.sucessor(testing);
    testing->key = 23;
    //std::cout << "Pred(23): "<< tree.predecessor(testing);
    testing->key = 26;
    //std::cout << "Pred(26): "<< tree.predecessor(testing);

    std::cout << "Deleting Node 2" << std::endl;
    testing->key = 2;
    tree.deleteNode(testing);
    //////////////////////////////////////////////////////
    std::cout << "Print the order of the nodes in ascending manner after deleting 26" << std::endl;
    std::cout << tree;
    std::cout << std::string(10, '-') + '\n';

    delete testing;
    return 0;
}