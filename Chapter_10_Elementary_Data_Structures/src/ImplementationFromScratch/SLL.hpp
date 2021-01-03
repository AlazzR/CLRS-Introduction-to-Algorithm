#ifndef _SLL_H_
#define _SLL_H_
#include <iostream>
class SlNode{
    private: 
        int id;
    public:
        SlNode* next;
        SlNode()
        {
            next = NULL;
        }
        SlNode(int id, SlNode* ptr = NULL) 
        {
            this->id = id;
            next = ptr;
        }
        int getId() const
        {
            return this->id;
        }

};

class SlList{
    private:
        SlNode* head, *tail;
    public:
        SlList(){
            head = NULL;
            tail = NULL;
        }
        void addNodeHead(int id);
        void addNodeTail(int id);
        int deleteFromHead();
        int deleteFromTail();
        int deleteNode(int id);
        bool checkNode(int id) const;
        void printContent() const;
        ~SlList()
        {
            SlNode* ptr;
            while(this->head == NULL)
            {
                ptr = this->head->next;
                delete head;
                //Move head to the next node.
                head = ptr;

            }
        }
};


#endif /*_SLL_H_*/