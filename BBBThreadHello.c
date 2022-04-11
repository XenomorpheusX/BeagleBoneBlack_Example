// Dora Avun
#include <pthread.h>
#include <semaphore.h>
sem_t semaphore[5]; // also a global variable just like mutexes
void *thread_function( void *arg ) 
{ 
	sem_wait( &semaphore ); 
	// perform some task 
	printf("\nHello World %u",arg);

	pthread_exit( NULL );
}
int main() 
{
	int tmp; 
	int i;
	for(i = 0; i < 5; i++)
	{
		tmp = sem_init( &semaphore, 0, i);
		pthread_create( &sem_t[tmp], NULL, thread_function, NULL ); 
		sem_post( &semaphore );
		pthread_join(&sem_t[tmp], NULL );
		sem_destroy( &semaphore );
		printf("\nHello World %u", tmp);

	} 

	return 0;
}

