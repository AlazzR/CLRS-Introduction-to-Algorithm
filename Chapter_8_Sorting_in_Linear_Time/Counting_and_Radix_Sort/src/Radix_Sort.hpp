#ifndef _Radix_Sort_H_
#define _Radix_Sort_H_
#include"Counting_Sort.hpp"

Node* radixSort(Node* A, int n, std::string compareBasedList[], int numArgument)
{
    int size = numArgument;
    int minSizeName = A[0].name.length();
    int minSizeOccupation = A[0].occupation.length();
    for(int i=0; i < n; i++)
    {
        if(minSizeName >= A[i].name.length())
            minSizeName = A[i].name.length();
    }
    for(int i=0; i < n; i++)
    {
        if(minSizeOccupation >= A[i].occupation.length())
            minSizeOccupation = A[i].occupation.length();
    }
    for(int i=0; i < size; i++)
    {
        if(compareBasedList[i] == "name")
        {
            std::cout << "Order based on Name\n";
            for(int j=minSizeName - 1; j >= 0; j--)
                A = counting_sort<char>(A, n, compareBasedList[i], j);
            for(int i=0; i < n; i++)
                std::cout << A[i];  
        }
        else if (compareBasedList[i] == "occupation")
        {
            std::cout << "Order based on Occupation\n";
            for(int j=minSizeOccupation - 1; j >= 0; j--)
                A = counting_sort<char>(A, n, compareBasedList[i], j);
            for(int i=0; i < n; i++)
                std::cout << A[i];  
        }
        else if (compareBasedList[i] == "martial_status")
        {
            std::cout << "Order based on martial status\n";
            A = counting_sort<bool>(A, n, compareBasedList[i], 0);
            for(int i=0; i < n; i++)
                std::cout << A[i];  
        }
        else
        {
            std::cout << "Order based on " + compareBasedList[i] + "\n";
            A = counting_sort<int>(A, n, compareBasedList[i], 0);
            for(int i=0; i < n; i++)
                std::cout << A[i];  
        }
    }
    return A;

}

#endif