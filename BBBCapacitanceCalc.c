#include <stdio.h>
#include <stdlib.h>

void get_capacitors(int n,float *cap);
void calc_capacitance(int n, float *cap, float *c_e);

int main(void)
{
    float *capacitors, C_equ;
    int ncap;
    char q;
    
    while (1)
    {
      printf("How many capacitors in parallel >>");
      scanf("%d",&ncap);
    
      capacitors = (float *) malloc(ncap*sizeof(float));
    
      if (capacitors == NULL)
       puts("Cannot allocate enough memory");
      else
      {
        get_capacitors(ncap,capacitors);
        calc_capacitance(ncap,capacitors,&C_equ);
        printf("Equivalent capacitance is %8.3f microfarads\n",C_equ);
        printf("\nContinue?");
        scanf("%s",&q);
        if (q == 'n')
           break;
      }
    }
    return(0);
}

void get_capacitors(int n,float *cap)
{
     int i;
     
     for (i=1;i<=n;i++)
     {
         printf("Enter capacitor %d >>",i);
         scanf("%f",cap);
         cap++;
     }
}

void calc_capacitance(int n,float *cap,float *c_e)
{
     float c=0;
     int i;
     
         for (i=0;i<n;i++)
         {
             c += *cap;
             cap++;
         }
         *c_e = c;
}  

