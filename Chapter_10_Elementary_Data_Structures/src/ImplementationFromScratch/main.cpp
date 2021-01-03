#include "main.hpp"


int main(int argc, char** argv)
{
    SlList sLinked;
    sLinked.addNodeHead(10);
    sLinked.addNodeHead(4);
    sLinked.addNodeHead(6);
    sLinked.printContent();
    std::cout << "***********************************" << std::endl;
    sLinked.addNodeTail(5);
    sLinked.addNodeTail(17);
    sLinked.addNodeTail(19);
    sLinked.addNodeTail(20);
    sLinked.printContent();
    std::cout << "***********************************" << std::endl;
    std::cout << "Delete From Head: " << sLinked.deleteFromHead() << std::endl;
    std::cout << "Delete From Tail: " << sLinked.deleteFromTail() << std::endl;
    std::cout << "Delete by Node #: 19-" << sLinked.deleteNode(19) << std::endl;
    sLinked.printContent();
    std::cout << "***********************************" << std::endl;

    //Double linked Layer
    DLL dLL;
    for(int i=0; i<10; i++)
        dLL.addTohead(i);

    dLL.printContent();

    dLL.addTohead(60);
    dLL.printContent();
    std::cout << "***********************************" << std::endl;

    dLL.deleteFromHead();
    dLL.printContent();
    std::cout << "***********************************" << std::endl;

    dLL.addToTail(50);
    dLL.printContent();
    std::cout << "***********************************" << std::endl;

    dLL.deleteFromTail();
    dLL.printContent();
    std::cout << "***********************************" << std::endl;
    dLL.deleteById(9);
    dLL.printContent();

    std::cout << "***********************************" << std::endl;
    dLL.deleteById(4);
    dLL.printContent();

    std::cout << "***********************************" << std::endl;
    dLL.deleteById(0);
    dLL.printContent();
    return 0;
}