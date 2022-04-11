#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>//include this for compiling with tread.

void * PrintHello(void * data)
{
    printf("\n Hello from thread %u", (int)pthread_self());
    printf(", I was created in iteration number %u ", (int)data);
    pthread_exit(NULL);
}

int main(int argc, char * argv[])
{
    int rc;
    int n = 11; //N is the number of threads and it can be changed by the user!
    int i;
    pthread_t tid[n];
    for(i = 0; i < n; i++)//loops through user specified n.
    {
	if (i%5 == 0)//if iteration is divisible by 5, then sleep for 1 second.
        {
	  sleep(1);
        }
        rc = pthread_create(&tid[i], NULL, PrintHello, (void*)i);
        if(rc)
        {
             printf("\n ERROR: return code from pthread_create is %d \n", rc);
             exit(1);
        }
        //printing thread info
        printf("\n I'm thread %u. ",(int)pthread_self());
        printf("Created New Thread (%u) ", (int)tid[i]);
        printf("in iteration: %u", i);
        
    }

    pthread_exit(NULL);
}
