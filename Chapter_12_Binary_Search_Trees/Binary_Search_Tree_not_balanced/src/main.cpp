#include "main.h"

int main(int argc, char** argv)
{
    BST* tree;
    tree = new BST();
    int keys[10] = {23, 60, 8, 4, 16, 26, 15, 30, 31, 2};
    for(int i=0; i < 10; i++)
    {
        tree->insert(keys[i], 0, 0, 0, 0, 0, 0);
    }
    std::vector<BSTNode*> nodes = tree->getOrderNodesMin();
    std::cout << "Print the order of the nodes in ascending manner" << std::endl;
    for(auto node: nodes)
    {
        std::cout << node;
    }
    std::cout << std::string(10, '-') + '\n';
    std::cout << "Root: "<< tree->getRoot();

    std::cout << "Min: "<< tree->find_min();
    std::cout << "Max: "<< tree->find_max();

    std::cout << "Succ(8): "<< tree->successor(8);
    std::cout << "Succ(16): "<< tree->successor(16);
    std::cout << "Pred(23): "<< tree->predecessor(23);
    std::cout << "Pred(26): "<< tree->predecessor(26);

    std::cout << "Deleting Node 26" << std::endl;
    tree->deleteNode(26);

    std::vector<BSTNode*> nodes1 = tree->getOrderNodesMin();//I don't want to deal with clutter that will appear in the terminal
    std::cout << "Print the order of the nodes in ascending manner after deleting 26" << std::endl;
    for(auto node: nodes1)
    {
        std::cout << node;
    }
    std::cout << std::string(10, '-') + '\n';

    delete tree;
    return 0;
}