# 🐧 Ubuntu Installation on VirtualBox

This document outlines the process of installing **Ubuntu** as a virtual machine using **Oracle VM VirtualBox**.
Each step provides brief, clear guidance for users completing the setup.

---

### “Verifying the Installation Configuration...”

<img width="400" height="300" alt="Screenshot (428)" src="https://github.com/user-attachments/assets/5bf9b957-df09-4e13-bf0c-991ad745082c" />

During the initial phase of installation, the setup screen displays:

> **Verifying the installation configuration...**

At this stage, Ubuntu validates all selected installation options, such as language, keyboard layout, and disk configuration.
This verification ensures that the configuration is correct before proceeding.
No user action is required; the process continues automatically once verification is complete.

---

### “Installing...” (Copying Files)

<img width="400" height="300" alt="Screenshot (429)" src="https://github.com/user-attachments/assets/8003ca30-fdf4-4209-bebf-724b36ad4333" />

After the configuration verification, the installer proceeds with system installation.
Messages such as the following appear:

> **Installing the system...**
> **Copying files...**

During this step, the installer copies essential system files from the installation ISO to the virtual hard drive and sets up the base operating system.
This process may take several minutes, depending on the system’s performance.
No input is needed until the next configuration screen appears.

---

### “Scanning the Installation Media...”

<img width="400" height="300" alt="Screenshot (430)" src="https://github.com/user-attachments/assets/75b1be82-8826-4905-af39-98baf942f731" />

Once the file-copying process is complete, the installer proceeds to:

> **Scanning the installation media...**

At this stage, the system checks the integrity of the installation source (the ISO file) to ensure that all necessary components were copied correctly and that no files are missing or corrupted.
This verification helps prevent installation errors or boot issues later.

The process is automatic and does not require user interaction.
Upon successful completion, the installer continues to the next configuration steps.

---

### “Configuring Hardware...”

<img width="400" height="300" alt="Screenshot (431)" src="https://github.com/user-attachments/assets/1d5cc254-77a2-4669-8951-bbc9f1e544d0" />

Following the media scan, the installer moves on to:

> **Configuring hardware...**

During this step, the installer detects and configures virtual hardware components within VirtualBox, including the virtual CPU, RAM, storage controllers, and network interfaces.
This ensures that Ubuntu can interact properly with the virtual machine environment and utilize available resources efficiently.

The process is automatic, and no user input is required.
Once the hardware configuration is complete, the installation continues to further system setup stages.

---

### “Installing System...”

<img width="400" height="300" alt="Screenshot (432)" src="https://github.com/user-attachments/assets/6bd1697b-39ce-418f-9c8c-f4e349ad8c57" />

After hardware configuration, the installer proceeds with:

> **Installing system...**

At this stage, the installer finalizes the installation by placing system files, libraries, and default applications into the virtual machine.
This step completes the core operating system setup, ensuring that Ubuntu is fully functional and ready for user configuration.

The process is automated and may take several minutes depending on system performance.
No user intervention is necessary until the next configuration screens appear.

---

### “Downloading Packages...”

<img width="400" height="300" alt="Screenshot (433)" src="https://github.com/user-attachments/assets/6f7e8147-fdcd-4ce5-935e-164fb37eca30" />

Once the core system files are installed, the installer begins:

> **Downloading packages...**

During this stage, Ubuntu retrieves additional software packages and updates from the installation media or online repositories, depending on the selected options.
These packages include essential utilities, drivers, and system components that enhance system functionality and ensure compatibility.

The process is fully automated and may take several minutes, depending on the system’s performance and network speed.
No user interaction is required until package installation completes.

---

### “Choose Your Account / User Login”

<img width="400" height="300" alt="Screenshot (434)" src="https://github.com/user-attachments/assets/48aedf24-6f59-4756-9f5c-d599050de195" />

After the system and packages are installed, the installation process enters the **user login configuration** phase.

At this stage, Ubuntu prompts the user to:

* Select the primary user account (if multiple accounts were created during setup)
* Enter the username and password
* Configure optional preferences, such as automatic login or privacy settings

This step ensures secure access to the system and allows the user to personalize the desktop environment.
Once the login information is entered correctly, the system prepares the desktop for first-time use.

---

### “Entering the User Account Password”

<img width="400" height="300" alt="Screenshot (435)" src="https://github.com/user-attachments/assets/5e777fc2-4153-4df8-adbc-b50c3eb5da70" />

Following account selection, the installer prompts the user to **enter the password** associated with the chosen account.

This step ensures secure access to the Ubuntu system and protects personal files and system settings.
The password entered will be required for logging in, performing administrative tasks, and managing system updates.

Once the password is confirmed, the system finalizes account setup and prepares the desktop environment for first-time use.

---

### “Connect Online Accounts” (Optional)

<img width="400" height="300" alt="Screenshot (436)" src="https://github.com/user-attachments/assets/bcfbd639-f783-4a62-9df2-d3bd2eaf26d6" />

After completing the user account setup, Ubuntu offers the option to **connect online accounts** such as Google, Microsoft, or other cloud services.

This step allows the system to synchronize emails, calendars, files, and other services automatically.
However, this step is **optional**, and the user may choose to **skip** it without affecting the installation or system functionality.

If skipped, the system proceeds directly to the desktop environment.

---

### “Ubuntu Pro” (Optional)

<img width="400" height="300" alt="Screenshot (437)" src="https://github.com/user-attachments/assets/355d934c-23ce-4874-a0a3-8af9035b361b" />

Following the online accounts step, Ubuntu presents the **Ubuntu Pro** subscription option.

Ubuntu Pro provides extended security maintenance and enterprise-grade updates for the system.
This step is **optional**, and the user may choose **“Skip for now”** to continue using the standard Ubuntu version without a subscription.

Skipping this step does not affect system functionality or the installed features.
The installer then proceeds to finalize the setup and load the desktop environment.

---

### “Help Improve Ubuntu” (Optional)

<img width="400" height="300" alt="Screenshot (438)" src="https://github.com/user-attachments/assets/b5f3ed2b-2761-41fd-abbb-5ecea4c9ca00" />

Before the desktop is fully loaded, Ubuntu prompts the user with an option to **help improve Ubuntu** by sending anonymous system information and usage statistics.

This step is **optional** and provides feedback to the developers for system improvements and bug fixes.
In this case, the choice **“No, don’t send system info”** is selected, which does not affect system functionality or future updates.

After this step, the system proceeds to finalize the setup and display the Ubuntu desktop for first use.

---

### “Welcome to Ubuntu”

<img width="400" height="300" alt="Screenshot (439)" src="https://github.com/user-attachments/assets/822a9ee6-c3cd-40e9-bf9a-7fdfdcfdaaaf" />

Upon completing optional setup steps, the installer displays the **“Welcome to Ubuntu”** screen.

At this stage, users are prompted to configure additional preferences, such as:

* **Location services** (for timezone and location-based features)
* Other optional personalization settings

In this instance, location services are **turned off**, and the **“Next”** option is selected to continue.
This choice does not impact system functionality, and the system proceeds to finalize the desktop environment for first-time use.

---

### “You’re Ready to Go”

<img width="400" height="300" alt="Screenshot (440)" src="https://github.com/user-attachments/assets/f37c9ace-b70d-482f-a768-39eb76e8d53c" />

After completing all setup and optional configurations, Ubuntu displays the final screen:

> **You’re ready to go!**

At this stage, the system confirms that the installation is complete and that the virtual machine is ready for use.
Selecting **“Done”** exits the installer and loads the Ubuntu desktop environment.

The operating system is now fully functional, and the user can begin using Ubuntu within VirtualBox.

---

### “Configure Region & Language and Restart”

Once the Ubuntu desktop is loaded, the system may prompt for final personalization settings, such as **Region & Language**.

<img width="400" height="300" alt="Screenshot (441)" src="https://github.com/user-attachments/assets/dc32295b-434e-422a-8aac-f5108e442834" />

<img width="400" height="300" alt="Screenshot (442)" src="https://github.com/user-attachments/assets/d1cdd238-cd9e-4c7a-aefe-4e98eab0916b" />

During this step:

* Both **Language** and **Format** are set to **United States**.

<img width="400" height="300" alt="Screenshot (443)" src="https://github.com/user-attachments/assets/bb748209-030f-4151-97bb-eaf3a3054694" />

<img width="400" height="300" alt="Screenshot (444)" src="https://github.com/user-attachments/assets/cd566d36-332e-428d-8cdf-a97561d8402c" />

After applying these settings, the virtual machine is **restarted from within Ubuntu** to ensure all configurations take effect properly.
This restart finalizes the installation process, and the system is now fully configured and ready for regular use.
