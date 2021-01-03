#include<iostream>
#include<deque>
#include<memory>
//This algorithm I studied from The Algorithm Design Manual
void merge(std::unique_ptr<float[]>& , int , int , int );
void merge_sort(std::unique_ptr<float[]>& array, int lowInd, int highInd)
{
    int middle;
    //The recursion stops when we reach a signle element
    if(lowInd < highInd)
    {
        middle = (lowInd + highInd)/2;
        merge_sort(array, lowInd, middle);//Take the left half
        merge_sort(array, middle + 1, highInd);//Take the right half
        merge(array, lowInd, middle, highInd);
    }
}

void merge(std::unique_ptr<float[]>& array, int low, int middle, int high)
{
    //Using The queue will allow us to use the FIFO process
    std::deque<float> LB;
    std::deque<float> RB;
    for(int i=low; i <= middle; i++)
        LB.push_back(array[i]);

    for(int i=middle+1; i <= high; i++)
        RB.push_back(array[i]);
    
    //Now, we will merge the two buffers in a sorted mechanisim
    int counter = low;
    while(!(LB.empty()) && !(RB.empty()))
    {
        if(LB.front() < RB.front())
        {
            array[counter] = LB.front();
            LB.pop_front();
        }
        else
        {
            array[counter] = RB.front();
            RB.pop_front();
        }
        counter++;
    }
    //Either RB or LB aren't empty which we need to put them back in the array
    while(!(LB.empty()))
    {
        array[counter++] = LB.front();
        LB.pop_front();
    }
    while(!(RB.empty()))
    {
        array[counter++] = RB.front();
        RB.pop_front();
    }
}

int main(int argc, char** argv)
{

    int size = 10;
    std::unique_ptr<float[]> array( new float[10]);
    for(int i=0; i< size; i++)
        array[i] = size - i - 1;
    for(int i=0; i < size; i++)
        std::cout << "Unsorted Array, Element at " << i << " Equal to: " << array[i] << std::endl;
    
    merge_sort(array, 0, size - 1);
    for(int i=0; i < size; i++)
        std::cout << "Sorted Array, Element at " << i << " Equal to: " << array[i] << std::endl;

    return 0;
}