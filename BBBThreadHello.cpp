// Dora_Avun
#include <pthread.h>
#include <semaphore.h>

sem_t semaphore; 
// also a global variable just like mutexes

void *thread_function( void *arg ) 
{ 
	sem_wait( &semaphore ); 
	// perform some task 
	pthread_exit( NULL );
}
int main() 
{
	int tmp; tmp = sem_init( &semaphore, 0, 0 ); // initialize

	pthread_create( &thread[i], NULL, thread_function, NULL ); 
	sem_post( &semaphore );
	pthread_join( thread[i], NULL );
	sem_destroy( &semaphore ); 

	return 0;
}
