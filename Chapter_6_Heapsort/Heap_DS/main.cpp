#include "main.hpp"

int main(int argc, char** argv)
{
    float array[11] = {0.0F, 16.5F, 14.3F, 10.2F, 8.5F, 7.0F, 9.0F, 3.2F, 2.4F, 4.3F, 1.0F};
    std::cout << "Unsorted Array" << std::endl;
    for(int i=0; i < 11; i++)
        std::cout << i << ":" << array[i] << std::endl;
    
    Heap<float> heapsort(array, 11);
    std::cout << std::string(30, '*') + " " << std::endl;
    std::cout << "Initial Heap\n";
    heapsort.printTree();
    
    heapsort.buildHeabify();
    std::cout << std::string(30, '*') + " " << std::endl;
    std::cout << "Tree shape after building the heap\n";
    heapsort.printTree();
    
    float* tmp;
    std::cout << std::string(30, '*') + " " << std::endl;
    tmp = heapsort.heapSort();
    delete[] tmp;
    
    std::cout << std::string(30, '*') + " " << std::endl;
    std::cout << "Inserting the largest value: 60.5" << std::endl;
    heapsort.insertion(60.5F);
    std::cout << "Printing the updated tree\n";
    heapsort.printTree();
    std::cout << "Showing the new order\n";
    tmp = heapsort.heapSort();
    delete[] tmp;
    
    std::cout << std::string(30, '*') + " " << std::endl;
    std::cout << "Inserting the smallest value: -5" << std::endl;
    heapsort.insertion(-5.0F);
    std::cout << "Printing the updated tree\n";
    heapsort.printTree();
    std::cout << "Showing the new order\n";
    tmp = heapsort.heapSort();
    delete[] tmp;
    
    std::cout << std::string(30, '*') + " " << std::endl;
    std::cout << "Inserting a mediocre value: 6.8" << std::endl;
    heapsort.insertion(6.8F);
    std::cout << "Printing the updated tree\n";
    heapsort.printTree();
    std::cout << "Showing the new order\n";
    tmp = heapsort.heapSort();
    delete[] tmp;
    
    return 0;
}