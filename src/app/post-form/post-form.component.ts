import { Component } from '@angular/core';
import { POST_FORM } from '../constants/constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialPostService } from '../services/social-post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  POST_FORM = POST_FORM;
  isUploadImage: boolean = false;
  form: FormGroup;
  showEmojiPicker = false;
  matDialogClose : boolean = false ;
  textAreaCharactersLength : Number = 0 ;
  sets: Array<'' | 'apple' | 'google' | 'twitter' | 'facebook'> = [
    'apple',
    'google',
    'twitter',
    'facebook',
  ];
  set: '' | 'apple' | 'google' | 'twitter' | 'facebook' = 'twitter';
  bug: any;
  error: any;
  data: any;

  constructor(private fb: FormBuilder, private socialPostService: SocialPostService) {
    this.form = this.fb.group({
      message: ['', Validators.required],
      file: [null]
    });
  }

  

  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    const currentMessage = this.form.get('message')?.value;
    const newMessage = `${currentMessage}${event.emoji.native}`;
    this.form.get('message')?.setValue(newMessage);
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }

  onBlur() {
    console.log('onblur');
  }

  onFileSelected(event: any) {
    this.files.push(...event.addedFiles);
  }
  files: File[] | any = [];
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  toggleUploadImage() {
    this.isUploadImage = !this.isUploadImage;
  }
  onTextChange(value: string) {
    this.textAreaCharactersLength = value.length;    
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     const formData = new FormData();
  //     formData.append('description', this.form.value.message);
  //     formData.append('files', this.files[0]);
  
  //     this.socialPostService.postDetails(formData).subscribe(
  //       (response) => {
  //         this.data = response;
  //         console.log("this.data>>>>>>", this.data);
  //         Swal.fire({
  //           title: 'Success!',
  //           text: 'Your form has been successfully submitted.',
  //           icon: 'success',
  //           confirmButtonText: 'OK'
  //         }).then(() => {
  //           window.location.reload(); 
  //         });
          
  //       },
  //       (error) => {
  //         Swal.fire({
  //           title: 'Error!',
  //           text: 'There was an error submitting your form. Please try again.',
  //           icon: 'error',
  //           confirmButtonText: 'OK'
  //         });
  //       }
  //     );
  //   }
  // }

  compressImage(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const elem = document.createElement('canvas');
          const scaleFactor = 0.5; 
          elem.width = img.width * scaleFactor;
          elem.height = img.height * scaleFactor;
          const ctx = elem.getContext('2d');
          ctx!.drawImage(img, 0, 0, elem.width, elem.height);
          ctx!.canvas.toBlob(
            (blob) => {
              resolve(blob!);
            },
            'image/jpeg',
            0.6
          );
        };
        img.src = event.target!.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('description', this.form.value.message);
  
      if (this.files.length > 0) {
        try {
          const compressedBlob = await this.compressImage(this.files[0]);
          formData.append('files', compressedBlob, this.files[0].name);
        } catch (error) {
          console.error('Error compressing image:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error compressing the image. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return;
        }
      }
  
      this.socialPostService.postDetails(formData).subscribe(
        (response) => {
          this.data = response;
          console.log("this.data>>>>>>", this.data);
          Swal.fire({
            title: 'Success!',
            text: 'Your form has been successfully submitted.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an error submitting your form. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
  
}
