#include "Counting_Sort.hpp"
#include "Radix_Sort.hpp"
#include<string>

int main(int argc, char** argv)
{
    Node* nodes;
    nodes = new Node[11];
    int keys[11] = {0, 0, 1, 1, 3, 2, 5, 9, 4, 3, 5};
    std::string names[11] = {"Rashid Az",
                            "Rasheed Az",
                            "Reashid Az",
                            "Rashid Aa",
                            "Rasheed Aa",
                            "Baha Az", 
                            "Baha Aa",
                            "Samir Az", 
                            "Mamoun Az",
                            "Rasheed Aa", 
                            "Baha aa"};
    int ages[11] = {26,
                   25,
                   30, 
                   32, 
                   34,
                   43, 
                   24,
                   72, 
                   42, 
                   34, 
                   23};
    std::string occupations[11]={"Engineer", 
                                 "Aerospace",
                                 "Accountant",
                                 "Doctor", 
                                 "Engineer",
                                 "Computer science",
                                 "Accountant",
                                 "Assistant",
                                 "Teacher",
                                 "Engineer",
                                 "Doctor"};
    bool martial_statues[11] = {false, true, false, true, true, false, true, false, false, true, true};
    //Ordered by martial_status<occupation<age<name<key.
    for(int i=0; i <11; i++)
        nodes[i].updatingValues(keys[i], names[i], ages[i], occupations[i], martial_statues[i]);

    //char c = 'a';
    //std::cout << sizeof(nodes) << " " << sizeof(Node) << std::endl;
    
    //Uncomment for counting sort
    /*
    nodes = counting_sort<char>(nodes, 10, "name", 0);
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << "Ordered nodes in an ascending manner by only Couting Sort\n";
    for(int i=0; i < 10; i++)
        std::cout << nodes[i];
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    */
   
    std::string flags[5] = {"martial_status", "occupation", "age", "name", "key"};
    nodes = radixSort(nodes, 11, flags, (int)(sizeof(flags)/sizeof(flags[0])));
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << "Ordered by martial_status<occupation<age<name<key\n";
    std::cout << "Ordered nodes in an ascending manner by only Radix Sort\n";
    for(int i=0; i < 11; i++)
        std::cout << nodes[i];
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';
    std::cout << std::string(50, '-') + '\n';

    delete[] nodes;
    return 0;
}