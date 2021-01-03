#ifndef _Main_H_
#define _Main_H_
#include<iostream>
#include<string>
#include<cmath>
template<typename T>
class Heap{
    private:
        int heapsize; 
        int length;
        T* array;
    public:
        Heap(T arr[], int size)
        {
            array = new T[size];
            this->length = size;
            this->heapsize = 0;
            for(int i=0; i < this->length; i++)
            {
                array[i] = arr[i];
                this->heapsize++;
            }
        }
        void buildHeabify()
        {
            int start;
            if(length%2 == 0)
                start = std::floor(length/2) - 1;
            else 
                start = std::floor(length/2);

            for(int i= start; i >=0 ; i--)
            {
                maxHeapify(i);
            }
        }

        T* heapSort()
        {
            T* sortedArray;
            sortedArray = new T[this->length];
            T* tmp;
            tmp = new T[this->length]; 
            std::copy(array, array + length, tmp);
            int length = this->length;
            int hSize = this->heapsize;
            //I will hold the initial array as a temporary array in order not to lose it.
            int counter = 0;
            for(int i = this->length - 1; i >= 0; i--)
            {
                std::swap(array[0], array[i]);
                sortedArray[counter++] = array[i];
                this->heapsize--;
                maxHeapify(0);

            }
            std::cout << "Sorted Array" << std::endl;
            for(int i=0; i < this->length; i++)
                std::cout << i << ":" << sortedArray[i] << std::endl;
            
            std::copy(tmp, tmp + length, this->array);
            this->heapsize = hSize;
            delete[] tmp;
            return sortedArray;

        }

        void maxHeapify(int i)
        {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int largest;
            if(left < this->heapsize && array[left] >= array[i])
                largest = left;
            else
                largest = i;
            if(right < this->heapsize && array[right] >= array[largest])
                largest = right;
            if( largest != i)
            {
                //Move the largest to parent node
                std::swap(array[i], array[largest]);
                maxHeapify(largest);//Go to the child to check for heap-property.
            }
            
        }
        void printTree() const
        {
            for(int i=0; i< (int)heapsize/2; i++)
            {
                for(int j=0; j < std::pow(2, i) && (j +i) < heapsize; j++)
                    std::cout << i <<":" <<array[j + i] << std::string(std::pow(2, i), ' ');
                std::cout << std::endl;
            }


        }
        void reverseHeapify(int child)
        {
            int parent;
            //The following is used to find the parent position.
            if(child% 2 == 0)
                parent = std::floor(child/2) - 1;
            else
                parent = std::floor(child/2);

            if(parent >= 0 && array[parent] <= array[child])
            {
                std::swap(array[child], array[parent]);
                //Now, we need to check if the parent doesn't violate the max-property
                reverseHeapify(parent);
            }            
        }
        void insertion(T key)
        {
            T* tmp;
            tmp = new T[this->length + 1];
            for(int i=0; i < this->length; i++)
                tmp[i] = array[i];
            tmp[length] = key;
            delete[] array;
            this->array = tmp;
            this->length = this->length + 1;
            this->heapsize = this->length;
            reverseHeapify(this->length - 1);
        }
        ~Heap()
        {
            std::cout << std::string(30, '*') + " " << std::endl;
            std::cout << "Deleting this heap with the following Tree Structure" << std::endl;
            printTree();
            delete[] array;
        }
        


};

#endif /*_Main_H_*/