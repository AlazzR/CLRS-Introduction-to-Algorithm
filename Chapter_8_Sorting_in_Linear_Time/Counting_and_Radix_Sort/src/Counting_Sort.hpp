#ifndef _Counting_Sort_H_
#define _Counting_Sort_H_
#include<iostream>

class Node{
    public:
        int key;
        std::string name;
        int age;
        std::string occupation;
        bool martial_status;

        Node(int key=0, std::string name="", int age=0, std::string occupation="", bool martial_status=false)
        {
            this->key = key >= 0? key:0;
            this->name = name;
            this->age = age>=0?age:0;
            this->occupation = occupation;
            this->martial_status = martial_status;
        }
        void updatingValues(int key=0, std::string name="", int age=0, std::string occupation="", bool martial_status=false)
        {
            this->key = key >= 0? key:0;
            this->name = name;
            this->age = age>=0?age:0;
            this->occupation = occupation;
            this->martial_status = martial_status;
        }

        friend std::ostream& operator<<(std::ostream& out, Node& n)
        {
            out << "key: " << n.key << " Name: " << n.name << " Age: " << n.age << " Occupation: " << n.occupation;
            if(n.martial_status)
              out << " Martial status: " << "Married" << std::endl;
            else
              out << " Martial status: " << "Single" << std::endl;
            return out;
            

        }
        friend std::ostream& operator<<(std::ostream& out, Node* n)
        {
            out << "key: " << n->key << " Name: " << n->name << " Age: " << n->age << " Occupation: " << n->occupation;
            if(n->martial_status)
              out << " Martial status: " << "Married" << std::endl;
            else
              out << " Martial status: " << "Single" << std::endl;
            return out;
            

        }
        void operator=(const Node& right){
            this->key= right.key;
            this->name= right.name;
            this->age= right.age;
            this->occupation= right.occupation;
            this->martial_status= right.martial_status;
        }
        ~Node()
        {
            //std::cout << "Deleting the following nodes: \n";
            //std::cout << "Address: " << this << std::endl;
            //std::cout << this;
        }
};
 //Ordered by martial_status<occupation<age<name<key.
template <typename T>
Node* counting_sort(Node* A, int n, std::string comparedBasedOn, int ind)
{
    T max;
    T min;
    //Need to find the minimum and maximum value
    if(comparedBasedOn == "key")
    {
        min = max = A[0].key;
        //finding min
        for(int i=0; i < n; i++)
        {
            if(min >= A[i].key)
                min = A[i].key;
        }
        //finding max
        for(int i=0; i < n; i++)
        {
            if(max <= A[i].key)
                max = A[i].key;
        }
    }
    else if(comparedBasedOn == "martial_status")
    {
        min = false;
        max = true;
    }
    else if(comparedBasedOn == "occupation")
    {
        min = max = A[0].occupation[ind];
        //finding min, just a single letter
        for(int i=0; i < n; i++)
        {
            if(min > A[i].occupation[ind])
                min = A[i].occupation[ind];
        }
        //finding max, just a single letter.
        for(int i=0; i < n; i++)
        {
            if(max <= A[i].occupation[ind])
                max = A[i].occupation[ind];
        }
    }
    else if(comparedBasedOn == "age")
    {
        min = max = A[0].age;
        //finding min
        for(int i=0; i < n; i++)
        {
            if(min >= A[i].age)
                min = A[i].age;
        }
        //finding max
        for(int i=0; i < n; i++)
        {
            if(max <= A[i].age)
                max = A[i].age;
        }

    }
    else
    {
        min = max = A[0].name[ind];
        //finding min, just a single letter.
        for(int i=0; i < n; i++)
        {
            if(min > A[i].name[ind])
                min = A[i].name[ind];
        }
        //finding max, just a single letter.
        for(int i=0; i < n; i++)
        {
            if(max <= A[i].name[ind])
                max = A[i].name[ind];
        }
    } 

    //Counting sort
    //Need to make lower case
    Node* B;
    B = new Node[n];
    
    int* C;
    int k = max - min + 2;
    C = new int[max - min + 2];//The extra 1 is used to have 0 at the beginning of Array C
    for(int i=0; i < max - min + 2; i++)
        C[i] = 0;
    for(int i= 0; i < n; i++)
    {
        if(comparedBasedOn == "key")
            C[A[i].key - min +1] = C[A[i].key - min+1] + 1;
        else if(comparedBasedOn == "martial_status")
            C[A[i].martial_status - min +1] = C[A[i].martial_status - min+1] + 1;
        else if(comparedBasedOn == "occupation")
            C[A[i].occupation[ind] - min +1] = C[A[i].occupation[ind] - min+1] + 1;
        else if(comparedBasedOn == "age")
            C[A[i].age - min +1] = C[A[i].age - min+1] + 1;
        else
            C[A[i].name[ind] - min +1] = C[A[i].name[ind] - min+1] + 1;
    }
    //Update the count in the table to ensure that the table is stable.
    for(int i=1; i < max - min + 2; i++)
        C[i]= C[i] + C[i-1];
    for(int i = n - 1; i >= 0; i--)
    {
        if(comparedBasedOn == "key")
        {
            B[C[A[i].key - min + 1] - 1] = A[i];
            C[A[i].key - min + 1] -=1;
        }
        else if(comparedBasedOn == "martial_status")
        {
            B[C[A[i].martial_status - min + 1] - 1] = A[i];
            C[A[i].martial_status - min + 1] -=1;
        }
        else if(comparedBasedOn == "occupation")
        {
            B[C[A[i].occupation[ind] - min + 1] - 1] = A[i];
            C[A[i].occupation[ind] - min + 1] -=1;
        }
        else if(comparedBasedOn == "age")
        {
            B[C[A[i].age - min + 1] - 1] = A[i];
            C[A[i].age - min + 1] -=1;
        }
        else
        {
            B[C[A[i].name[ind] - min + 1] - 1] = A[i];
            C[A[i].name[ind]- min + 1] -=1;
        }

    }

    //std::cout << "B\n";
    //for(int i=0; i < n; i++)
    //    std::cout << B[i];
    delete[] C;
    
    delete[] A;
    A = B;
    //std::cout << "A\n";

    //for(int i=0; i < n; i++)
    //    std::cout << A[i];
    return A;
}

#endif /*_Counting_Sort_H_*/