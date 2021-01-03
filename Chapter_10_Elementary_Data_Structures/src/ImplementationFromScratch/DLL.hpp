#ifndef _DLL_H_
#define _DLL_H_
#include<iostream>
#include<queue>

struct NodeDLL{
    NodeDLL* next;
    NodeDLL* prev;
    int id;
    
    NodeDLL(int iden, NodeDLL* nx=NULL, NodeDLL* pr=NULL)
    {
        next = nx;
        prev = pr;
        id = iden;
    }

};

class DLL{
    private:
        NodeDLL* head;
        NodeDLL* tail;
    
    public:
        DLL()
        {
            head = NULL;
            tail = NULL;
        }

        void addTohead(int id);
        void addToTail(int id);
        void deleteFromHead();
        void deleteFromTail();
        void deleteById(int id);

        NodeDLL* findNode(int id) const;
        void printContent() const;
        ~DLL()
        {
            //Single element
            if(head == tail)
            {
                delete head;
                head = tail = 0;
            }
            //More than one element
            else
            {
                for(NodeDLL* tmp= head; tmp->next != NULL;)
                {
                    std::cout << "Deleting this node with the following id: " << tmp->id << std::endl;
                    tmp = tmp->next;
                    tmp->prev = NULL;
                    delete head;
                    head = tmp;
                } 
                std::cout << "Deleting this node with the following id: " << head->id << std::endl;
                delete head;

            }

        }
};


#endif /*_DLL_H_*/