#include<iostream>
#include<memory>

template<typename T>
std::unique_ptr<T[]> insertSort(std::unique_ptr<T[]>& array, int size=10)
{
    std::unique_ptr<T[]> sortedArray(new T[size]);
    for(int i=0; i < size; i++)
       sortedArray[i] = 0.0F;

    //I will sort them in a descending manner
    for(int i=0; i < size; i++)   
    {
        T tmp = array[i];
        int j = i;
        while(j > -1 && sortedArray[j - 1] > tmp)
        {
            sortedArray[j] = sortedArray[j - 1];
            sortedArray[j - 1] = tmp;
            j = j - 1;
        }
        sortedArray[j] = tmp;
    } 

    
    return std::move(sortedArray);
}
int main(int argc, char** argv)
{
    int size = 10;
    std::unique_ptr<float[]> array( new float[10]);
    for(int i=0; i< size; i++)
        array[i] = size - i - 1;
    for(int i=0; i < size; i++)
        std::cout << "Unsorted Array, Element at " << i << " Equal to: " << array[i] << std::endl;
    
    std::unique_ptr<float[]> sortedArray = insertSort<float>(array, size);
    for(int i=0; i < size; i++)
        std::cout << "Sorted Array, Element at " << i << " Equal to: " << sortedArray[i] << std::endl;
    return 0;
}