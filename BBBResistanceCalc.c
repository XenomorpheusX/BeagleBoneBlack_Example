#include <stdio.h>
#include <stdlib.h>

void get_resistors(int n,float *res);
void calc_resistance(int n, float *res, float *r_e);

int main(void)
{
    float *resistors, R_equ;
    int nres;
    char q;
    
    while (1)
    {
      printf("How many resistors in parallel >>");
      scanf("%d",&nres);
    
      resistors = (float *) malloc(nres*sizeof(float));
    
      if (resistors == NULL)
       puts("Cannot allocate enough memory");
      else
      {
        get_resistors(nres,resistors);
        calc_resistance(nres,resistors,&R_equ);
        printf("Equivalent resistance is %8.3f ohm\n",R_equ);
        printf("\nContinue?");
        scanf("%s",&q);
        if (q == 'n')
           break;
      }
    }
    return(0);
}

void get_resistors(int n,float *res)
{
     int i;
     
     for (i=1;i<=n;i++)
     {
         printf("Enter resistor %d >>",i);
         scanf("%f",res);
         res++;
     }
}

void calc_resistance(int n,float *res,float *r_e)
{
     float r=0;
     int i;
     
         for (i=0;i<n;i++)
         {
             r +=1/(*res);
             res++;
         }
         *r_e=1/r;
}  

